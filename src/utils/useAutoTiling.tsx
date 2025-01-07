import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useAutoTiling = () => {
  const queryClient = useQueryClient();
  const uri = "ws://localhost:6123";

  useEffect(() => {
    const websocket = new WebSocket(uri);

    websocket.onopen = () => {
      websocket.send("sub -e window_managed");
    };

    websocket.onmessage = async (event) => {
      try {
        const response = JSON.parse(event.data);

        if (response.messageType === "client_response") {
          console.log(`Event subscription: ${response.success}`);
        } else if (response.messageType === "event_subscription") {
          const tilingSize = response?.data?.managedWindow?.tilingSize;

          if (tilingSize !== null && tilingSize <= 0.5) {
            websocket.send("c toggle-tiling-direction");
          }

          queryClient.setQueryData(["tilingSize"], tilingSize);
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      websocket.close();
    };
  }, [queryClient, uri]);

  return {
    tilingSize: queryClient.getQueryData(["tilingSize"]),
  };
};

export default useAutoTiling;
