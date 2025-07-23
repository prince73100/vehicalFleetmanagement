import React, { useState, useEffect } from "react";
import {
  Truck,
  Shield,
  Clock,
  BarChart3,
  Users,
  MapPin,
  ArrowRight,
  Menu,
  X,
  CheckCircle,
  Star,
  Zap,
} from "lucide-react";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Smart Fleet Management",
      description:
        "Optimize your entire vehicle fleet with AI-powered routing and real-time tracking capabilities.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Reliable Booking System",
      description:
        "Never double-book again with our advanced availability checking and capacity management.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Real-time Availability",
      description:
        "Instant vehicle availability based on capacity, route optimization, and time constraints.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description:
        "Get insights into fleet utilization, booking patterns, and operational efficiency.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-user Access",
      description:
        "Role-based access for administrators, fleet managers, and booking coordinators.",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Route Optimization",
      description:
        "Intelligent routing algorithms to maximize efficiency and minimize operational costs.",
    },
  ];

  const stats = [
    { number: "500+", label: "Active Fleets" },
    { number: "99.9%", label: "Uptime" },
    { number: "50%", label: "Cost Reduction" },
    { number: "24/7", label: "Support" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      company: "LogiTech Solutions",
      role: "Fleet Manager",
      content:
        "FleetLink transformed our operations. We've reduced booking conflicts by 95% and increased fleet utilization by 40%.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      company: "Urban Freight Co.",
      role: "Operations Director",
      content:
        "The real-time availability feature is a game-changer. Our clients love the transparency and reliability.",
      rating: 5,
    },
    {
      name: "Jennifer Walsh",
      company: "Metro Logistics",
      role: "CEO",
      content:
        "Best ROI we've seen from any logistics platform. The analytics help us make data-driven decisions daily.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-3xl transform -skew-y-6"></div>
        <div
          className={`max-w-7xl mx-auto relative transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-8">
              <Zap className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-sm text-blue-300">
                Revolutionary B2B Logistics Platform
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                Fleet Management
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline your B2B logistics operations with intelligent vehicle
              booking, real-time availability tracking, and advanced fleet
              optimization.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center group">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-blue-400/50 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-500/10 transition-all flex items-center">
                <Shield className="mr-2 w-5 h-5" />
                View Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-200 text-sm sm:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-cyan-600/10 to-blue-600/10 blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Powerful Features for Modern Logistics
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Everything you need to manage, optimize, and scale your vehicle
              fleet operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 group"
              >
                <div className="text-blue-400 mb-4 group-hover:text-cyan-300 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-100 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-blue-200 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/50 to-slate-900/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Why Choose FleetLink?
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Built specifically for B2B logistics operations, FleetLink
                combines cutting-edge technology with industry expertise to
                deliver unmatched reliability and efficiency.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Advanced capacity and route-based availability checking",
                  "Real-time fleet tracking and monitoring",
                  "Intelligent booking conflict prevention",
                  "Comprehensive analytics and reporting",
                  "Scalable architecture for growing businesses",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-blue-100">{item}</span>
                  </div>
                ))}
              </div>

              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all transform hover:scale-105">
                Learn More
              </button>
            </div>

            <div className="lg:pl-8">
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-8 rounded-3xl border border-blue-400/30 backdrop-blur-xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Real-time Dashboard
                  </h3>
                  <p className="text-blue-200">
                    Monitor your entire fleet at a glance
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                    <span className="text-blue-100">Active Vehicles</span>
                    <span className="text-white font-semibold">127/150</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                    <span className="text-blue-100">Booking Rate</span>
                    <span className="text-green-400 font-semibold">+12%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                    <span className="text-blue-100">Efficiency Score</span>
                    <span className="text-cyan-400 font-semibold">94%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See how FleetLink is transforming logistics operations across the
              globe
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-blue-100 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-blue-300 text-sm">
                    {testimonial.role}
                  </div>
                  <div className="text-cyan-400 text-sm">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
