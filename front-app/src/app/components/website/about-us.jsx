import React from 'react'

export default function AboutUs() {
  return (
    <section id="about" className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0" data-aos="fade-right">
            <h2 className="title-font text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <p className="mb-4 text-lg">Jhon's Backyard Grill was born from the dream of sharing
              Mexico's traditional flavors with our community. Our founders from Puebla brought family recipes
              that have been passed down for generations.</p>
            <p className="mb-4 text-lg">Every dish we serve uses the same ingredients and techniques
              found in Mexican homes, guaranteeing an authentic culinary experience.</p>
            <p className="text-lg">Welcome to our table, where the food is prepared with love and
              the flavors will make you feel right at home!</p>
          </div>
          <div className="md:w-1/2 md:pl-12" data-aos="fade-left">
            <img src="http://static.photos/people/640x360/5" alt="Team at Jhon's Backyard Grill"
              className="rounded-lg shadow-xl w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
