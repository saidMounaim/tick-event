export function About() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            About TickEvent
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            TickEvent is your premier destination for discovering and attending
            incredible events. Our mission is to connect event organizers with
            enthusiastic attendees, creating memorable experiences that bring
            communities together.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎫</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Simple and secure ticket booking process
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Events</h3>
              <p className="text-gray-600">
                Curated selection of premium events
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Building connections through shared experiences
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
