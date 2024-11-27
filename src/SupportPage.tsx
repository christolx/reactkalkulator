import React, {useState} from "react";

const SupportPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        topic: "",
        description: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormValid = formData.firstName && formData.email && formData.topic;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Karena tidak mengirim data ke API apapun
        if (!isFormValid) return;

        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            alert("Form submitted successfully!");
        }, 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
            <div className="w-full max-w-4xl bg-black rounded-lg p-6 shadow-lg flex flex-row flex-grow">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h1 className="text-2xl font-bold mb-6">Support Ticket Form</h1>
                    <hr/>
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
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange}
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


                    <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className={`w-full py-2 px-4 font-bold rounded-md ${isFormValid ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-600 cursor-not-allowed"} text-black`}
                    >
                        {isSubmitting ? "Sending..." : "SEND"}
                    </button>
                </form>
                <div className={"pl-4 flex-grow pt-16"}>
                    <label htmlFor="description" className="block text-sm font-medium">
                        Description (Optional)
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
