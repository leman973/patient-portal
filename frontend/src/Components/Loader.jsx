function Loader({ inline = false }) {
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${
        inline ? "py-4" : "vh-100"
      }`}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
