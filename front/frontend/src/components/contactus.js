import React, { useState } from 'react';

const ContactUS = () => {
    const [buttonText, setButtonText] = useState('Sign in');
    const [buttonClass, setButtonClass] = useState('w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500');

    const handleSubmit = (e) => {
        e.preventDefault();
        const originalText = buttonText;
        setButtonText('Success!');
        setButtonClass('w-full px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm');

        setTimeout(() => {
            setButtonText(originalText);
            setButtonClass('w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500');
            e.target.reset();
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8" id='contact'>
               <div class="max-w-md mx-auto mb-8 overflow-hidden rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-pink-600">
        <div class="p-8">
            <h2 class="mb-6 text-2xl font-bold text-white">Contact Us</h2>
            <form class="space-y-6">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-white">First Name</label>
                        <input type="text" 
                               class="block w-full px-3 py-2 mt-1 bg-white border-0 rounded-md shadow-sm bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-white">Last Name</label>
                        <input type="text" 
                               class="block w-full px-3 py-2 mt-1 bg-white border-0 rounded-md shadow-sm bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white" />
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-white">Email</label>
                    <input type="email" 
                           class="block w-full px-3 py-2 mt-1 bg-white border-0 rounded-md shadow-sm bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white"/>
                </div>
                <div>
                    <label class="block text-sm font-medium text-white">Message</label>
                    <textarea rows="4" 
                              class="block w-full px-3 py-2 mt-1 bg-white border-0 rounded-md shadow-sm bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white"></textarea>
                </div>
                <button type="submit" 
                        class="w-full px-4 py-2 text-sm font-medium text-white border-2 border-white rounded-md hover:bg-white hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-200">
                    Send Message
                </button>
            </form>
        </div>
    </div>
        </div>
    );
};

export default ContactUS;

