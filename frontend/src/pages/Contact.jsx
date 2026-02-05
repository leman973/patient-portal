import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check mandatory fields
    const isValid = Object.values(formData).every(
      (value) => value.trim() !== "",
    );

    if (!isValid) {
      alert("Please fill all the fields.");
      return;
    }

    // Show toast
    setShowToast(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    // Auto-hide toast
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="vh-100 d-flex align-items-center bg-light position-relative">
      {/* Toast */}
      {showToast && (
        <div className="toast show position-absolute bottom-0 end-0 m-4 mb-5">
          <div className="toast-header bg-success text-white">
            <strong className="me-auto">CarePlus Clinic</strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
          <div className="toast-body">
            ✅ Your message has been sent successfully. We’ll contact you soon.
          </div>
        </div>
      )}

      <div className="container">
        <div className="row g-4 align-items-stretch">
          {/* Left Info Card */}
          <div className="col-md-5">
            <div className="card h-100 border-0 shadow-lg rounded-4 bg-success text-white">
              <div className="card-body p-4 d-flex flex-column justify-content-center">
                <h2 className="fw-bold mb-3">Contact CarePlus Clinic</h2>
                <p className="mb-4">
                  Have a question or need help booking an appointment? Our team
                  is ready to assist you.
                </p>

                <div className="mb-3">
                  <h6 className="fw-bold mb-1">📍 Address</h6>
                  <p className="mb-0">
                    CarePlus Clinic
                    <br />
                    MG Road, Pune, Maharashtra
                  </p>
                </div>

                <div className="mb-3">
                  <h6 className="fw-bold mb-1">📞 Phone</h6>
                  <p className="mb-0">+91 98765 43210</p>
                </div>

                <div>
                  <h6 className="fw-bold mb-1">📧 Email</h6>
                  <p className="mb-0">support@careplusclinic.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="col-md-7">
            <div className="card h-100 border-0 shadow-lg rounded-4">
              <div className="card-body p-4">
                <h3 className="fw-bold text-primary mb-4 justify-content-center d-flex">
                  Send Us a Message
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Enter subject"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Message *
                      </label>
                      <textarea
                        rows="4"
                        name="message"
                        className="form-control"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message..."
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-success mt-4 px-4 py-2 fw-bold"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
