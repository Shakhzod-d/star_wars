export const MovieNode = ({ data }: any) => {
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        background: "#28a745",
        color: "#fff",
        position: "relative",
      }}
    >
      <div>{data.label}</div>
      <div style={{ whiteSpace: "pre-wrap" }}>{data.details}</div>
      {/* You can use 'Handle' components to connect to edges */}
      {/* <Handle type="source" position={"right"} style={{ top: "50%" }} /> */}
      {/* <Handle type="target" position="up" style={{ top: "50%" }} /> */}
    </div>
  );
};
