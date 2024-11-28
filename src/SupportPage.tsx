import React, { useState, useEffect } from "react";

const SupportPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        topic: "",
        description: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ticketNumber, setTicketNumber] = useState<number | null>(null);

    const isFormValid = formData.firstName && formData.email && formData.topic;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            const randomTicketNumber = Math.floor(1000 + Math.random() * 9000);
            setTicketNumber(randomTicketNumber);
        }, 2000);
    };

    useEffect(() => {
        if (ticketNumber !== null) {
            const timer = setTimeout(() => {
                setTicketNumber(null);
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    topic: "",
                    description: "",
                });
            }, 120000);
            return () => clearTimeout(timer);
        }
    }, [ticketNumber]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
            <div className="w-full max-w-4xl bg-black rounded-lg p-6 shadow-lg flex flex-col">
                <h1 className="text-2xl font-bold mb-6">Support Ticket Form</h1>
                <hr className="mb-6"/>
                <div className="min-h-[350px]">
                    {ticketNumber === null ? (
                        <form onSubmit={handleSubmit} className="flex flex-row space-x-4">
                            <div className="flex-1 space-y-4">
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label htmlFor="firstName" className="text-sm font-medium">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="lastName" className="text-sm font-medium">
                                            Last Name
                                        </label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">
                                        Topic <span className="text-red-500">*</span>
                                    </label>
                                    <div className="mt-2 space-y-2">
                                        <div>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="topic"
                                                    value="General"
                                                    onChange={handleInputChange}
                                                    className="form-radio text-yellow-500"
                                                    required
                                                />
                                                <span className="ml-2">General</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="topic"
                                                    value="Bug"
                                                    onChange={handleInputChange}
                                                    className="form-radio text-yellow-500"
                                                    required
                                                />
                                                <span className="ml-2">Bug</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium">
                                        Description (Optional)
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full h-60 bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                                    />
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        type="submit"
                                        disabled={!isFormValid || isSubmitting}
                                        className={`py-2 px-4 rounded-full text-white ${
                                            isFormValid
                                                ? "bg-yellow-500 hover:bg-yellow-600"
                                                : "bg-gray-600 cursor-not-allowed"
                                        }`}
                                    >
                                        {isSubmitting ? "Sending..." : "SEND"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center mt-28">
                            <h2 className="text-xl font-semibold text-yellow-400">
                                Thank you for sending us your report, we will track the problem now.
                            </h2>
                            <p className="text-lg mt-4">
                                Ticket Number: <span className="font-bold text-white">{ticketNumber}</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default SupportPage;
