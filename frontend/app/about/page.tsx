import React from "react";
import Image from "next/image";

const QuantumComputingExperiments: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-10">
            <h1 className="pb-10 text-center text-6xl font-bold text-gray-600">
                Quantum Computing Experiments
            </h1>

            <div className="flex w-full flex-col">
                <div className="card bg-base-300 rounded-box flex-row items-center p-6 text-gray-200">
                    <div className="p-6">
                        <h2 className="mb-8 text-3xl font-bold">
                            Cryptography and Breaking RSA
                        </h2>
                        <p className="mb-4 pr-10 text-xl leading-9">
                            In our quantum computing experiments, we explored
                            the field of cryptography and attempted to break the
                            RSA encryption algorithm. RSA is a widely used
                            public-key cryptosystem that relies on the
                            difficulty of factoring large numbers.
                        </p>
                    </div>
                    <Image
                        src="/cryptography.png"
                        alt="Picture of cryptography"
                        width={400}
                        height={400}
                        className="m-5"
                    ></Image>
                </div>

                <div className="rounded-box my-6 h-1 bg-gray-400"></div>

                <div className="card bg-base-300 rounded-box flex-row items-center p-6 text-gray-200">
                    <Image
                        src="/cryptography.png"
                        alt="Picture of cryptography"
                        width={400}
                        height={400}
                        className="m-5"
                    ></Image>
                    <div className="p-6">
                        <h2 className="mb-8 text-3xl font-bold">
                            Cryptography and Breaking RSA
                        </h2>
                        <p className="mb-4 pr-10 text-xl leading-9">
                            In our quantum computing experiments, we explored
                            the field of cryptography and attempted to break the
                            RSA encryption algorithm. RSA is a widely used
                            public-key cryptosystem that relies on the
                            difficulty of factoring large numbers.
                        </p>
                    </div>
                </div>

                <div className="rounded-box my-6 h-1 bg-gray-400"></div>

                <div className="card bg-base-300 rounded-box flex-row items-center p-6 text-gray-200">
                    <div className="p-6">
                        <h2 className="mb-8 text-3xl font-bold">
                            Cryptography and Breaking RSA
                        </h2>
                        <p className="mb-4 pr-10 text-xl leading-9">
                            In our quantum computing experiments, we explored
                            the field of cryptography and attempted to break the
                            RSA encryption algorithm. RSA is a widely used
                            public-key cryptosystem that relies on the
                            difficulty of factoring large numbers.
                        </p>
                    </div>
                    <Image
                        src="/cryptography.png"
                        alt="Picture of cryptography"
                        width={400}
                        height={400}
                        className="m-5"
                    ></Image>
                </div>

                <div className="rounded-box my-6 h-1 bg-gray-400"></div>

                <div className="card bg-base-300 rounded-box flex-row items-center p-6 text-gray-200">
                    <Image
                        src="/cryptography.png"
                        alt="Picture of cryptography"
                        width={400}
                        height={400}
                        className="m-5"
                    ></Image>
                    <div className="p-6">
                        <h2 className="mb-8 text-3xl font-bold">
                            Cryptography and Breaking RSA
                        </h2>
                        <p className="mb-4 pr-10 text-xl leading-9">
                            In our quantum computing experiments, we explored
                            the field of cryptography and attempted to break the
                            RSA encryption algorithm. RSA is a widely used
                            public-key cryptosystem that relies on the
                            difficulty of factoring large numbers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuantumComputingExperiments;
