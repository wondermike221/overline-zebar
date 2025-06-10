type Props = {
  ips: any[];
};

export default function List({ ips }: Props) {
  return (
    <>
      {ips.length > 0 ? (
        ips.map((ip) => (
          <p key={ip} className="break-all whitespace-normal">
            {ip}
          </p>
        ))
      ) : (
        <p>N/A</p>
      )}
    </>
  );
}
