import { getFirstEvent } from "@/lib/db/queries"
import { Calendar, MapPin, Clock, Sparkles, ChevronDown, Trophy } from "lucide-react"
import { InviteSearch } from "@/components/invite-search"

export default async function HomePage() {
  const event = await getFirstEvent()

  if (!event) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="text-center space-y-6 relative z-10">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="font-serif text-5xl text-primary">No Event Found</h1>
          <p className="text-muted-foreground text-lg">Please contact the administrator.</p>
        </div>
      </main>
    )
  }

  const primaryColor = event.primaryColor || "#1a2f4a"
  const accentColor = event.secondaryColor || "#22d3ee"

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full opacity-5 blur-3xl animate-pulse" style={{ background: primaryColor, animationDuration: '4s' }} />
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl animate-pulse" style={{ background: accentColor, animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full opacity-5 blur-3xl animate-pulse" style={{ background: primaryColor, animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Hero Section with Event Details */}
      <section className="flex-1 flex items-center justify-center px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          {/* Logo with enhanced styling */}
          {event.logoUrl && (
            <div className="flex justify-center animate-fade-in">
              <div className="relative group">
                <div className="absolute inset-0 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500" style={{ background: accentColor }} />
                <div className="relative  backdrop-blur-sm rounded-3xl p-8  border border-white/20">
                  <img
                    src={event.logoUrl || "/placeholder.svg"}
                    alt="Event logo"
                    className="h-48 w-auto object-contain transform group-hover:scale-105 transition-transform duration-500 rounded-4xl bg-whit"
                  />

                </div>
              </div>
            </div>
          )}


          {/* Decorative element with animation */}
          <div className="flex justify-center items-center gap-3">
            <div className="w-12 h-1 rounded-full transform -rotate-3 animate-pulse" style={{ background: accentColor, animationDuration: '3s' }} />
            {/* <Sparkles className="w-5 h-5" style={{ color: accentColor }} /> */}
            <div className="w-24 h-1.5 rounded-full" style={{ background: primaryColor }} />
            {/* <Sparkles className="w-5 h-5" style={{ color: accentColor }} /> */}
            <div className="w-12 h-1 rounded-full transform rotate-3 animate-pulse" style={{ background: accentColor, animationDuration: '3s', animationDelay: '0.5s' }} />
          </div>

          {/* Event Title with gradient text */}
          <div className="space-y-2">
            <h1
              className="font-serif text-4xl md:text-6xl text-balance leading-tight tracking-tight animate-fade-in"
              style={{ color: primaryColor }}
            >
              {event.name}
            </h1>
            <div className="flex justify-center">
              <div className="h-1 w-32 rounded-full opacity-50" style={{ background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})` }} />
            </div>
          </div>

          {/* Event Description with enhanced styling */}
          {event.description && (
            <div className="relative">
              <div className="absolute -left-8 top-0 text-8xl font-serif opacity-5" style={{ color: primaryColor }}>"</div>
              <p className="text-xl md:text-xl text-slate-600 text-pretty max-w-3xl mx-auto leading-relaxed relative z-10">
                {event.description}
              </p>
              <div className="absolute -right-8 bottom-0 text-8xl font-serif opacity-5" style={{ color: primaryColor }}>"</div>
            </div>
          )}

          {/* Event Details with enhanced card design */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch pt-6">
            {/* Date */}
            <div className="flex-1 max-w-xs group">
              <div className="h-full bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-400/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: `${accentColor}15` }}
                  >
                    <Calendar className="w-5 h-5" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold mb-1 uppercase tracking-wide"
                      style={{ color: primaryColor }}
                    >
                      Date
                    </p>
                    <p className="text-slate-600 text-sm font-medium leading-snug">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Time */}
            <div className="flex-1 max-w-xs group">
              <div className="h-full bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-400/20  hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: `${accentColor}15` }}
                  >
                    <Clock className="w-5 h-5" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold mb-1 uppercase tracking-wide"
                      style={{ color: primaryColor }}
                    >
                      Time
                    </p>
                    <p className="text-slate-600 text-sm font-medium leading-snug">
                      {event.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex-1 max-w-xs group">
              <div className="h-full bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-400/20  hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: `${accentColor}15` }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold mb-1 uppercase tracking-wide"
                      style={{ color: primaryColor }}
                    >
                      Location
                    </p>
                    <p className="text-slate-600 text-sm font-medium leading-snug">
                      {event.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Invite Search Section with enhanced styling */}
          <div className="pt-8">
            <div className="max-w-xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-400/20 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 blur-3xl -mr-32 -mt-32" style={{ background: accentColor }} />

                <div className="space-y-2 relative z-10">
                  <div className="flex justify-center mb-0">
                    <ChevronDown className="w-8 h-8 animate-bounce" style={{ color: accentColor }} />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl tracking-tight" style={{ color: primaryColor }}>
                    Check Your Invitation
                  </h2>
                  <p className="text-slate-600 ">Enter your name to find your personalized invitation</p>
                </div>

                <div className="relative z-10">
                  <InviteSearch eventId={event.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with enhanced design */}
      <footer className="py-10 px-4 border-t border-slate-200/50 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
            <div className="w-2 h-2 rounded-full" style={{ background: primaryColor }} />
            <div className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
          </div>
          <p className="text-slate-500 font-medium">We look forward to celebrating with you</p>
        </div>
      </footer>

      {/* <footer className="py-10 px-4 border-t backdrop-blur-sm relative z-10" style={{ borderColor: `${accentColor}30` }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-4">
            {/* Decorative bars */}
      {/* <div className="flex items-center gap-2">
              <div className="w-5 h-0.5 rounded-full" style={{ background: accentColor }} />
              <div className="w-2 h-0.5 rounded-full bg-slate-600" />
              <Trophy className="w-4 h-4" style={{ color: accentColor }} />
              <div className="w-2 h-0.5 rounded-full bg-slate-600" />
              <div className="w-5 h-0.5 rounded-full" style={{ background: accentColor }} />
            </div>

            <p className="text-slate-300 font-semibold text-base text-center uppercase tracking-wide">
              Celebrating Achievement
            </p>
          </div>
        </div>
      </footer> */}
    </main>
  )
}