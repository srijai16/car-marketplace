import React from "react";

function InfoSection() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center">

          {/* Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1470&auto=format&fit=crop"
              alt="Buy or Rent Car"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Buy or Rent Your Dream Car With Confidence
            </h2>

            <p className="mt-6 text-gray-600 text-lg">
              Explore a wide range of premium and affordable cars available for
              purchase or rent. Whether you need a daily ride, a family SUV, or a
              luxury weekend drive — we have options tailored just for you.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-start gap-3">
                <span className="bg-black text-white p-2 rounded-full text-sm">✔</span>
                <p className="text-gray-700">
                  Verified car listings with transparent pricing
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-black text-white p-2 rounded-full text-sm">✔</span>
                <p className="text-gray-700">
                  Flexible rental plans and easy EMI options
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-black text-white p-2 rounded-full text-sm">✔</span>
                <p className="text-gray-700">
                  Quick booking and secure payment process
                </p>
              </div>

            </div>

          

          </div>

        </div>
      </div>
    </section>
  );
}

export default InfoSection;