import React from 'react'

export function Infosection() {
  return (
    <>
        <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0" data-aos="fade-right">
                    <img src="http://static.photos/restaurant/640x360/10" alt="Restaurant interior"
                        className="rounded-lg shadow-xl w-full" />
                </div>
                <div className="md:w-1/2 md:pl-12" data-aos="fade-left">
                    <h2 className="title-font text-black! text-3xl md:text-4xl font-bold mb-4">Join us for a
                        great time
                    </h2>
                    <p className="text-gray-700 mb-6 text-lg">Our cozy dining room seats up to 45 guests, perfect for
                        enjoying our dishes in a warm, family-friendly setting.</p>
                    <div className="bg-white p-6 rounded-lg">
                        <h3 className="font-bold text-black! text-lg mb-2">How to get here?</h3>
                        <p className="text-gray-700">You will find us inside the gas station; just come in and ask for
                            Jhon's Backyard Grill. We can't wait to serve you!</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
