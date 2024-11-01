
'use client'

import React, { useState } from 'react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = () => {
       
        
    };

    const handleSubmit = () => {
       
        // Handle form submission (e.g., send data to an API)
        console.log('Form submitted:', formData);
    };

    return (
        <div className="container my-32 mx-auto px-2 md:px-4 ">
            <section className="mb-32">
                <div className="flex justify-center">
                    <div className="text-center md:max-w-xl lg:max-w-3xl">
                        <h2 className="mb-12 px-6 text-3xl font-bold">Contact us</h2>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <form className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6" onSubmit={handleSubmit}>
                        <div className="mb-3 w-full">
                            <label className="block font-medium mb-[2px] text-teal-700" htmlFor="name">Name</label>
                            <input type="text" className="px-2 py-2 border w-full outline-none rounded-md" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="mb-3 w-full">
                            <label className="block font-medium mb-[2px] text-teal-700" htmlFor="email">Email</label>
                            <input type="email" className="px-2 py-2 border w-full outline-none rounded-md" id="email" name="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3 w-full">
                            <label className="block font-medium mb-[2px] text-teal-700" htmlFor="message">Message</label>
                            <textarea className="px-2 py-2 border rounded-[5px] w-full outline-none" id="message" name="message" value={formData.message} onChange={handleChange}></textarea>
                        </div>
                        <button type="submit" className="mb-6 inline-block w-full rounded bg-teal-400 px-6 py-2.5 font-medium uppercase leading-normal text-white hover:shadow-md hover:bg-teal-500">
                            Send
                        </button>
                    </form>
                    <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                        <div className="flex flex-wrap">
                            {[
                                { title: 'Technical support', email: 'support@example.com', phone: '+1 234-567-89' },
                                { title: 'Sales questions', email: 'sales@example.com', phone: '+1 234-567-89' },
                                { title: 'Press', email: 'press@example.com', phone: '+1 234-567-89' },
                                { title: 'Bug report', email: 'bugs@example.com', phone: '+1 234-567-89' },
                            ].map((contact, index) => (
                                <div key={index} className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                                    <div className="flex items-start">
                                        <div className="shrink-0">
                                            <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                                                {/* Replace with appropriate SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-6 grow">
                                            <p className="mb-2 font-bold">{contact.title}</p>
                                            <p className="text-neutral-500">{contact.email}</p>
                                            <p className="text-neutral-500">{contact.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
