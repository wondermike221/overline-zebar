import { Button } from "./Button";

export function WorkspaceControls({ output }) {
  if (!output) return null;

  const workspaceOnClick = (workspace) => {
    output.glazewm.runCommand(`focus --workspace ${workspace.name}`);
  };

  return (
    <div className="flex items-center gap-2">
      {output.glazewm?.currentWorkspaces?.map((workspace) => {
        if (workspace.hasFocus) {
          return (
            <Button
              className="bg-background-subtle/80 hover:bg-background-subtle/80 border border-white/10 px-2"
              key={workspace.name}
              onClick={() => {
                workspaceOnClick(workspace);
              }}
            >
              {workspace.displayName ?? workspace.name}
            </Button>
          );
        } else {
          return (
            <Button
              key={workspace.name}
              className="px-2"
              onClick={() => {
                workspaceOnClick(workspace);
              }}
            >
              {workspace.displayName ?? workspace.name}
            </Button>
          );
        }
      })}
    </div>
  );
}
