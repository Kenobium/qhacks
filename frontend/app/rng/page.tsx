"use client";

import React, { useState } from "react";

const QuantumStateSimulator: React.FC = () => {
    const [numStates, setNumStates] = useState(1);
    const [probabilities, setProbabilities] = useState<number[]>([1]);
    const [names, setNames] = useState<string[]>(["State 0"]);

    const handleNumStatesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = parseInt(event.target.value);
        setNumStates(value);

        if (value <= names.length) {
            setNames(names.slice(0, value));
            setProbabilities(probabilities.slice(0, value));
        } else {
            for (let i = 0; i < value - names.length; i++) {
                names.push(`State ${names.length + i}`);
                probabilities.push(0);
            }

            setNames(names);
            setProbabilities(probabilities);
        }
    };

    const handleProbabilityChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = parseFloat(event.target.value);
        const updatedProbabilities = [...probabilities];
        updatedProbabilities[index] = value;
        setProbabilities(updatedProbabilities);
    };

    const handleNameChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        const updatedNames = [...names];
        updatedNames[index] = value;
        setNames(updatedNames);
    };

    const totalProbability = probabilities.reduce(
        (sum, probability) => sum + probability,
        0
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-8 text-4xl font-bold">Quantum State Simulator</h1>

            <div className="mb-8">
                <label htmlFor="numStates" className="mb-2 block font-bold">
                    Number of States:
                </label>
                <input
                    type="number"
                    id="numStates"
                    min="1"
                    max="8"
                    value={numStates}
                    onChange={handleNumStatesChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {Array.from({ length: numStates }, (_, index) => (
                    <div
                        key={index}
                        className="rounded-lg bg-white p-6 shadow-md"
                    >
                        <div className="mb-4 flex items-center">
                            <input
                                type="text"
                                value={names[index] || ""}
                                onChange={(event) =>
                                    handleNameChange(index, event)
                                }
                                className="mr-2 bg-white text-xl font-bold focus:outline-none"
                                placeholder="Enter state name"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor={`probability-${index}`}
                                className="mb-2 block"
                            >
                                Probability:
                            </label>
                            <input
                                type="number"
                                id={`probability-${index}`}
                                min="0"
                                max="1"
                                step="0.001"
                                value={
                                    probabilities[index]
                                        ? probabilities[index] == 1
                                            ? "1.000"
                                            : probabilities[index]
                                        : "0.000"
                                }
                                onChange={(event) =>
                                    handleProbabilityChange(index, event)
                                }
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <p className="text-lg">
                    Total Probability: {totalProbability.toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default QuantumStateSimulator;
