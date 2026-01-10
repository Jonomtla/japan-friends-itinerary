import { useState, useEffect, useRef, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { itineraryData, tripInfo, routeConnections } from './data/itinerary'
import './App.css'

// Fix for default marker icons in Leaflet with Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom marker icon creator with number
const createCustomIcon = (color, isSelected, number) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-pin ${isSelected ? 'selected' : ''}" style="background-color: ${color};">
        <span class="marker-number">${number}</span>
      </div>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42]
  })
}

// Weather icons
const weatherIcons = {
  'sun': '☀️',
  'cloud-sun': '⛅',
  'cloud': '☁️',
  'rain': '🌧️'
}

// Transport SVG icons
const TransportIcon = ({ type, size = 20 }) => {
  const icons = {
    'plane': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
      </svg>
    ),
    'train-bullet': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      </svg>
    ),
    'train': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zm5.5 13c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-11 0c-.83 0-1.5-.67-1.5-1.5S5.67 12 6.5 12s1.5.67 1.5 1.5S7.33 15 6.5 15zM18 10H6V7h12v3z"/>
      </svg>
    ),
    'bus': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
      </svg>
    )
  }
  return icons[type] || icons['train']
}

// Component to handle map view changes
function MapController({ selectedDestination, isPlaying, currentIndex }) {
  const map = useMap()

  useEffect(() => {
    if (isPlaying && currentIndex < itineraryData.length) {
      const dest = itineraryData[currentIndex]
      map.flyTo(dest.coordinates, currentIndex === 0 ? 6 : 9, {
        duration: 2
      })
    }
  }, [isPlaying, currentIndex, map])

  useEffect(() => {
    if (selectedDestination && !isPlaying) {
      map.flyTo(selectedDestination.coordinates, 10, {
        duration: 1.5
      })
    }
  }, [selectedDestination, isPlaying, map])

  return null
}

// Interpolate between two coordinates
function interpolateCoord(from, to, t) {
  return [
    from[0] + (to[0] - from[0]) * t,
    from[1] + (to[1] - from[1]) * t
  ]
}

// Animated route with smooth line drawing between destinations
function AnimatedRoute({ routeCoordinates, currentIndex, isPlaying, animationSpeed }) {
  const [drawProgress, setDrawProgress] = useState(0)
  const animationRef = useRef(null)
  const lastIndexRef = useRef(currentIndex)

  // When currentIndex changes during playback, animate the line to the new destination
  useEffect(() => {
    if (!isPlaying) {
      setDrawProgress(0)
      lastIndexRef.current = currentIndex
      return
    }

    // If we just moved to a new destination, animate the draw
    if (currentIndex !== lastIndexRef.current) {
      setDrawProgress(0)
      const startTime = Date.now()
      const duration = animationSpeed * 0.6 // Draw takes 60% of the segment time

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(1, elapsed / duration)
        // Ease out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3)
        setDrawProgress(eased)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
      lastIndexRef.current = currentIndex
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [currentIndex, isPlaying, animationSpeed])

  // Build the visible coordinates including the animated segment
  const visibleCoordinates = useMemo(() => {
    if (!isPlaying) return routeCoordinates

    // Get all completed segments (up to the previous destination)
    const completedCoords = routeCoordinates.slice(0, currentIndex)

    if (currentIndex === 0) {
      // At the first destination, just show that point
      return [routeCoordinates[0]]
    }

    if (currentIndex >= routeCoordinates.length) {
      return routeCoordinates
    }

    // Add the animated segment from previous to current
    const from = routeCoordinates[currentIndex - 1]
    const to = routeCoordinates[currentIndex]

    if (drawProgress >= 1) {
      // Animation complete - show full line to current destination
      return [...completedCoords, from, to]
    }

    // Interpolate the current position along the line
    const currentPos = interpolateCoord(from, to, drawProgress)
    return [...completedCoords, from, currentPos]
  }, [routeCoordinates, currentIndex, isPlaying, drawProgress])

  // Get position for the animated dot (at the drawing head)
  const headPosition = useMemo(() => {
    if (!isPlaying || currentIndex === 0 || currentIndex >= routeCoordinates.length) {
      return null
    }
    const from = routeCoordinates[currentIndex - 1]
    const to = routeCoordinates[currentIndex]
    return interpolateCoord(from, to, drawProgress)
  }, [isPlaying, currentIndex, routeCoordinates, drawProgress])

  return (
    <>
      {/* Full route - faded background showing entire path */}
      <Polyline
        positions={routeCoordinates}
        color="#94a3b8"
        weight={2}
        opacity={0.3}
        lineCap="round"
        lineJoin="round"
        dashArray="6, 10"
      />
      {/* Traveled route - outer glow */}
      {visibleCoordinates.length > 1 && (
        <Polyline
          positions={visibleCoordinates}
          color="#e91e63"
          weight={8}
          opacity={0.25}
          lineCap="round"
          lineJoin="round"
        />
      )}
      {/* Traveled route - main path */}
      {visibleCoordinates.length > 1 && (
        <Polyline
          positions={visibleCoordinates}
          color="#e91e63"
          weight={4}
          opacity={1}
          lineCap="round"
          lineJoin="round"
        />
      )}
      {/* Animated head dot at the drawing position */}
      {isPlaying && headPosition && drawProgress < 1 && (
        <Marker
          position={headPosition}
          icon={L.divIcon({
            className: 'route-head',
            html: '<div class="route-head-dot"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          })}
        />
      )}
    </>
  )
}

function App() {
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animationSpeed] = useState(4000)
  const [imageErrors, setImageErrors] = useState({})
  const timelineRef = useRef(null)

  const routeCoordinates = itineraryData.map(dest => dest.coordinates)

  // Auto-play animation
  useEffect(() => {
    let timer
    if (isPlaying) {
      if (currentIndex < itineraryData.length - 1) {
        timer = setTimeout(() => {
          setCurrentIndex(prev => prev + 1)
        }, animationSpeed)
      } else {
        setTimeout(() => {
          setIsPlaying(false)
        }, animationSpeed)
      }
    }
    return () => clearTimeout(timer)
  }, [isPlaying, currentIndex, animationSpeed])

  useEffect(() => {
    if (isPlaying) {
      setSelectedDestination(itineraryData[currentIndex])
      setActiveTab('details')
    }
  }, [currentIndex, isPlaying])

  useEffect(() => {
    if (timelineRef.current) {
      const activeItem = timelineRef.current.querySelector('.timeline-item.active')
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [currentIndex, selectedDestination])

  const handleDestinationClick = (destination, index) => {
    setSelectedDestination(destination)
    setCurrentIndex(index)
    setActiveTab('details')
    if (isPlaying) setIsPlaying(false)
  }

  const handlePlayPause = () => {
    if (!isPlaying) {
      if (currentIndex >= itineraryData.length - 1) setCurrentIndex(0)
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }

  const handlePrev = () => {
    setIsPlaying(false)
    const newIndex = Math.max(0, currentIndex - 1)
    setCurrentIndex(newIndex)
    setSelectedDestination(itineraryData[newIndex])
    setActiveTab('details')
  }

  const handleNext = () => {
    setIsPlaying(false)
    const newIndex = Math.min(itineraryData.length - 1, currentIndex + 1)
    setCurrentIndex(newIndex)
    setSelectedDestination(itineraryData[newIndex])
    setActiveTab('details')
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentIndex(0)
    setSelectedDestination(null)
    setActiveTab('overview')
  }

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  const getPhaseLabel = (phase) => tripInfo.phases[phase]?.label || phase
  const getPhaseColor = (phase) => tripInfo.phases[phase]?.color || '#666'
  const getTransportBetween = (fromIndex) => routeConnections.find(c => c.from === fromIndex + 1) || null

  const currentDestination = selectedDestination || (isPlaying ? itineraryData[currentIndex] : null)

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>{tripInfo.title}</h1>
            <p className="header-subtitle">
              {tripInfo.dates} | {tripInfo.totalDays} Days | {tripInfo.destinations} Destinations
            </p>
          </div>
          <div className="header-controls">
            <button
              className={`control-btn ${isPlaying ? 'playing' : ''}`}
              onClick={handlePlayPause}
              title={isPlaying ? 'Pause' : 'Play Trip Animation'}
            >
              {isPlaying ? '⏸' : '▶'} {isPlaying ? 'Pause' : 'Play Trip'}
            </button>
          </div>
        </div>
      </header>

      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-tabs">
            <button
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="overview-panel">
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-value">{tripInfo.workSummary.totalWorkDays}</span>
                  <span className="stat-label">Work Days</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{tripInfo.workSummary.lightWorkDays}</span>
                  <span className="stat-label">Light Work</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{tripInfo.workSummary.fullDaysOff}</span>
                  <span className="stat-label">Days Off</span>
                </div>
              </div>

              <div className="travel-notes">
                <h3>Travel Notes</h3>
                <ul>
                  {tripInfo.travelNotes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>

              <div className="destination-list">
                <h3>Destinations</h3>
                {itineraryData.map((dest, idx) => (
                  <div key={dest.id}>
                    <div
                      className={`destination-item ${currentDestination?.id === dest.id ? 'selected' : ''} ${isPlaying && idx <= currentIndex ? 'visited' : ''}`}
                      onClick={() => handleDestinationClick(dest, idx)}
                    >
                      <div className="dest-number" style={{ backgroundColor: dest.color }}>
                        {idx + 1}
                      </div>
                      <div className="dest-info">
                        <span className="dest-name">{dest.destination}</span>
                        <span className="dest-dates">{dest.dates}</span>
                      </div>
                      <div className="dest-weather-mini">
                        <span>{weatherIcons[dest.weather.icon]}</span>
                        <span>{dest.weather.temp}</span>
                      </div>
                      <span className="dest-phase" style={{ backgroundColor: getPhaseColor(dest.phase) }}>
                        {dest.nights}N
                      </span>
                    </div>
                    {idx < itineraryData.length - 1 && (
                      <div className="transport-connector">
                        <span className="transport-icon-svg">
                          <TransportIcon type={getTransportBetween(idx)?.icon} size={16} />
                        </span>
                        <span className="transport-info">
                          {getTransportBetween(idx)?.transport} {getTransportBetween(idx)?.duration}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'details' && currentDestination && (
            <div className="details-panel">
              {/* Photo Header */}
              <div className="photo-header">
                {!imageErrors[currentDestination.id] ? (
                  <img
                    src={currentDestination.photo}
                    alt={currentDestination.destination}
                    onError={() => handleImageError(currentDestination.id)}
                  />
                ) : (
                  <div className="photo-placeholder" style={{ backgroundColor: currentDestination.color }}>
                    <span className="photo-placeholder-icon">
                      {currentDestination.icon === 'palm' ? '🌴' :
                       currentDestination.icon === 'tower' ? '🗼' :
                       currentDestination.icon === 'temple' ? '⛩️' :
                       currentDestination.icon === 'hotspring' ? '♨️' :
                       currentDestination.icon === 'mountain' ? '🗻' :
                       currentDestination.icon === 'castle' ? '🏯' :
                       currentDestination.icon === 'racing' ? '🏎️' :
                       currentDestination.icon === 'plane' ? '✈️' : '🌏'}
                    </span>
                  </div>
                )}
                <div className="photo-overlay">
                  <div className="details-nav">
                    <button className="nav-btn" onClick={handlePrev} disabled={currentIndex === 0}>
                      ←
                    </button>
                    <span className="nav-position">{currentIndex + 1} / {itineraryData.length}</span>
                    <button className="nav-btn" onClick={handleNext} disabled={currentIndex === itineraryData.length - 1}>
                      →
                    </button>
                  </div>
                  <h2>{currentDestination.destination}</h2>
                  <p>{currentDestination.location}</p>
                </div>
              </div>

              <div className="details-content">
                {/* Weather & Time Card */}
                <div className="weather-time-card">
                  <div className="weather-section">
                    <span className="weather-icon-large">{weatherIcons[currentDestination.weather.icon]}</span>
                    <div className="weather-info">
                      <span className="weather-temp">{currentDestination.weather.temp}</span>
                      <span className="weather-condition">{currentDestination.weather.condition}</span>
                      <span className="weather-humidity">Humidity: {currentDestination.weather.humidity}</span>
                    </div>
                  </div>
                  <div className="time-section">
                    <span className="time-icon">🕰️</span>
                    <div className="time-info">
                      <span className="timezone-name">{currentDestination.timezone.name} (UTC{currentDestination.timezone.offset})</span>
                      <span className="timezone-diff">{currentDestination.timezone.nzDiff}</span>
                    </div>
                  </div>
                </div>

                {/* Dates & Phase */}
                <div className="dates-phase-row">
                  <div className="dates-info">
                    <span className="dates-label">Dates</span>
                    <span className="dates-value">{currentDestination.dates}</span>
                    <span className="nights-value">{currentDestination.nights} nights</span>
                  </div>
                  <div className="phase-info">
                    <span className="phase-label">Travelling with</span>
                    <span className="phase-badge-large" style={{ backgroundColor: getPhaseColor(currentDestination.phase) }}>
                      {currentDestination.travellingWith}
                    </span>
                  </div>
                </div>

                <div className="details-section">
                  <h4>Highlights</h4>
                  <ul className="highlights-list">
                    {currentDestination.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="details-section">
                  <h4>Activities & Schedule</h4>
                  <div className="activities-list">
                    {currentDestination.activities.map((act, idx) => (
                      <div key={idx} className="activity-item">
                        <span className="activity-day">{act.day}</span>
                        <span className="activity-desc">{act.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {currentDestination.workSpaces.length > 0 && (
                  <div className="details-section">
                    <h4>Coworking Spaces</h4>
                    <div className="workspace-list">
                      {currentDestination.workSpaces.map((space, idx) => (
                        <div key={idx} className="workspace-item">
                          <span className="workspace-name">{space.name}</span>
                          <span className="workspace-details">{space.details}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next destination preview */}
                {currentIndex < itineraryData.length - 1 && (
                  <div className="next-destination" onClick={() => handleDestinationClick(itineraryData[currentIndex + 1], currentIndex + 1)}>
                    <div className="next-transport">
                      <span className="transport-icon-large">
                        <TransportIcon type={getTransportBetween(currentIndex)?.icon} size={28} />
                      </span>
                      <div className="transport-details">
                        <span className="transport-mode">{getTransportBetween(currentIndex)?.transport}</span>
                        <span className="transport-duration">{getTransportBetween(currentIndex)?.duration}</span>
                      </div>
                    </div>
                    <div className="next-preview">
                      <span className="next-label">Next Stop</span>
                      <span className="next-name">{itineraryData[currentIndex + 1].destination}</span>
                      <span className="next-weather">
                        {weatherIcons[itineraryData[currentIndex + 1].weather.icon]} {itineraryData[currentIndex + 1].weather.temp}
                      </span>
                    </div>
                    <span className="next-arrow">→</span>
                  </div>
                )}
              </div>

              <button className="back-btn" onClick={handleReset}>
                Back to Overview
              </button>
            </div>
          )}

          {activeTab === 'details' && !currentDestination && (
            <div className="no-selection">
              <p>Click on a destination marker or select from the list to see details.</p>
              <button className="start-tour-btn" onClick={handlePlayPause}>
                ▶ Start Trip Walkthrough
              </button>
            </div>
          )}
        </aside>

        {/* Map */}
        <div className="map-container">
          <MapContainer
            center={[30, 145]}
            zoom={4}
            className="leaflet-map"
            scrollWheelZoom={true}
          >
            {/* CartoDB Voyager - clean stylish map */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />

            <MapController
              selectedDestination={currentDestination}
              isPlaying={isPlaying}
              currentIndex={currentIndex}
            />

            <AnimatedRoute
              routeCoordinates={routeCoordinates}
              currentIndex={currentIndex}
              isPlaying={isPlaying}
              animationSpeed={animationSpeed}
            />

            {/* Destination markers */}
            {itineraryData.map((dest, idx) => (
              <Marker
                key={dest.id}
                position={dest.coordinates}
                icon={createCustomIcon(dest.color, currentDestination?.id === dest.id, idx + 1)}
                opacity={!isPlaying || idx <= currentIndex ? 1 : 0.3}
                eventHandlers={{ click: () => handleDestinationClick(dest, idx) }}
              >
                <Popup>
                  <div className="popup-content">
                    <div className="popup-photo">
                      <img src={dest.photo} alt={dest.destination} />
                    </div>
                    <h3>{idx + 1}. {dest.destination}</h3>
                    <p><strong>{dest.dates}</strong> | {dest.nights} nights</p>
                    <div className="popup-weather">
                      {weatherIcons[dest.weather.icon]} {dest.weather.temp} - {dest.weather.condition}
                    </div>
                    <p className="popup-phase" style={{ color: getPhaseColor(dest.phase) }}>
                      {getPhaseLabel(dest.phase)}
                    </p>
                    <button className="popup-btn" onClick={() => handleDestinationClick(dest, idx)}>
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Playback overlay */}
          {isPlaying && (
            <div className="playback-overlay">
              <div className="playback-photo">
                <img src={itineraryData[currentIndex].photo} alt="" />
              </div>
              <div className="playback-info">
                <span className="playback-destination">{itineraryData[currentIndex].destination}</span>
                <span className="playback-dates">{itineraryData[currentIndex].dates}</span>
                <span className="playback-weather">
                  {weatherIcons[itineraryData[currentIndex].weather.icon]} {itineraryData[currentIndex].weather.temp}
                </span>
              </div>
              <div className="playback-progress">
                <div className="progress-bar" style={{ width: `${((currentIndex + 1) / itineraryData.length) * 100}%` }} />
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="map-legend">
            <h4>Trip Phases</h4>
            {Object.entries(tripInfo.phases).map(([key, value]) => (
              <div key={key} className="legend-item">
                <span className="legend-color" style={{ backgroundColor: value.color }}></span>
                <span>{value.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="timeline-container">
        <div className="timeline-controls">
          <button className="timeline-btn" onClick={handlePrev} disabled={currentIndex === 0}>
            ←
          </button>
          <button className="timeline-btn play-btn" onClick={handlePlayPause}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className="timeline-btn" onClick={handleNext} disabled={currentIndex === itineraryData.length - 1}>
            →
          </button>
        </div>
        <div className="timeline-scroll" ref={timelineRef}>
          <div className="timeline-track">
            {itineraryData.map((dest, idx) => (
              <div key={dest.id} className="timeline-segment">
                <div
                  className={`timeline-item ${currentDestination?.id === dest.id ? 'active' : ''} ${isPlaying && idx < currentIndex ? 'visited' : ''}`}
                  onClick={() => handleDestinationClick(dest, idx)}
                  style={{ borderColor: dest.color }}
                >
                  <div className="timeline-marker" style={{ backgroundColor: dest.color }}>
                    {idx + 1}
                  </div>
                  <div className="timeline-info">
                    <span className="timeline-dest">{dest.destination}</span>
                    <span className="timeline-dates">{dest.dates}</span>
                    <span className="timeline-weather">
                      {weatherIcons[dest.weather.icon]} {dest.weather.temp}
                    </span>
                  </div>
                </div>
                {idx < itineraryData.length - 1 && (
                  <div className={`timeline-connector ${isPlaying && idx < currentIndex ? 'visited' : ''}`}>
                    <span className="connector-icon-svg">
                      <TransportIcon type={getTransportBetween(idx)?.icon} size={18} />
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
