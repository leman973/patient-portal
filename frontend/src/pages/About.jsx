import React from "react";
const reviews = [
  {
    id: 1,
    patient: "Amit Kulkarni",
    doctor: "Dr. Ananya Sharma",
    review:
      "The appointment process was super smooth. Doctor was very kind and explained everything clearly.",
    rating: 5,
  },
  {
    id: 2,
    patient: "Neha Patil",
    doctor: "Dr. Rahul Mehta",
    review:
      "Excellent experience! Booking was easy and the consultation was very professional.",
    rating: 4,
  },
  {
    id: 3,
    patient: "Rohit Verma",
    doctor: "Dr. Pooja Verma",
    review:
      "Clean clinic, friendly staff, and great follow-up support. Highly recommended!",
    rating: 5,
  },
  {
    id: 4,
    patient: "Sneha Joshi",
    doctor: "Dr. Ananya Sharma",
    review:
      "Loved the user interface and how quickly I got my appointment confirmed.",
    rating: 5,
  },
];

export default function AboutUs() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        className="py-5 text-white"
        style={{ background: "linear-gradient(120deg, #198754, #20c997)" }}
      >
        <div className="container text-center">
          <h1 className="fw-bold">About CarePlus Clinic</h1>
          <p className="lead mt-3">
            CarePlus Clinic is a modern digital healthcare platform dedicated to
            providing the highest quality medical services to patients. We
            combine state-of-the-art medical facilities with highly experienced
            and verified doctors to ensure every patient receives safe,
            reliable, and compassionate care. Our goal is to make healthcare
            accessible, efficient, and transparent by leveraging advanced
            technology, secure medical record management, and easy appointment
            scheduling. At CarePlus Clinic, we prioritize trust, patient
            comfort, and convenience, offering specialized care across multiple
            disciplines. By delivering innovative healthcare solutions and a
            patient-focused experience, we strive to improve the overall health
            and well-being of the communities we serve.
          </p>
        </div>
      </section>

      {/* ===== VISION & MISSION ===== */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-primary">
            Our Vision & Mission
          </h2>

          <div className="row g-4 justify-content-center">
            {/* Mission Card */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="fw-bold text-success">Our Mission</h5>
                  <p className="text-muted mt-3">
                    To provide a secure, accessible, and patient-centered
                    healthcare platform that connects individuals with highly
                    skilled doctors efficiently, simplifies appointment
                    scheduling, and ensures reliable management of medical
                    records.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="fw-bold text-primary">Our Vision</h5>
                  <p className="text-muted mt-3">
                    To become a leading digital healthcare solution globally,
                    delivering innovative, trustworthy, and seamless medical
                    services that improve the health, safety, and well-being of
                    every patient.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Patient Reviews Section */}
      <section className="py-5 bg-soft-green">
        <div className="container">
          <h2 className="text-center fw-bold mb-4 text-success">
            What Our Patients Say
          </h2>
        </div>

        <div className="reviews-wrapper">
          <div className="reviews-track">
            {[...reviews, ...reviews].map((item, index) => (
              <div className="review-card" key={index}>
                <p className="review-text">“{item.review}”</p>

                <h6 className="fw-bold mb-0">{item.patient}</h6>
                <small className="text-success">Treated by {item.doctor}</small>

                <div className="mt-2">{"⭐".repeat(item.rating)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
