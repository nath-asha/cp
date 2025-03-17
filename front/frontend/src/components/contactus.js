import React, { useState } from 'react';

const ContactUS = () => {
    const [buttonText, setButtonText] = useState('Sign in');
    const [buttonClass, setButtonClass] = useState(' text-black');

    const handleSubmit = (e) => {
        e.preventDefault();
        const originalText = buttonText;
        setButtonText('Success!');
        setButtonClass('text-black');

        setTimeout(() => {
            setButtonText(originalText);
            setButtonClass('w-full px-4 py-2 text-black');
            e.target.reset();
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8" id='contact'>
               <div className="max-w-md mx-auto mb-8 overflow-hidden">
        <div class="p-8">
            <h2 className="mb-6 text-black">Contact Us</h2>
            <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-black">First Name</label>
                        <input type="text" 
                               className="block w-full px-3 py-2 mt-1 bg-whitetext-black" />
                    </div>
                    <div>
                        <label className="block text-sm text-black">Last Name</label>
                        <input type="text" 
                               className="block w-full px-3 py-2 mt-1 bg-white text-black" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm text-black">Email</label>
                    <input type="email" 
                           className="block w-full px-3 py-2 mt-1text-black"/>
                </div>
                <div>
                    <label className="block text-sm text-black">Message</label>
                    <br></br>
                    <textarea className="form-control" style={{ minWidth: '100%' }}></textarea>
                   
                </div>
                <button type="submit" 
                        className="w-full px-4 py-2 text-black ">
                    Send Message
                </button>
            </form>
        </div>
    </div>
        </div>
    );
};

export default ContactUS;

