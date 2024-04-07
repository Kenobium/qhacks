"use client";

import React, { useState } from "react";
import { ResultTable } from "../components/table";
import { MouseEventHandler } from "react";

const QuantumStateSimulator: React.FC = () => {
    const [numStates, setNumStates] = useState(1);
    const [numShots, setNumShots] = useState(1);
    const [probabilities, setProbabilities] = useState<number[]>([1]);
    const [names, setNames] = useState<string[]>(["State 0"]);
    const [resultData, setResultData] = useState<Record<string, number> | null>(
        null
    );

    const handleNumShots = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumShots(parseInt(event.target.value));
    };

    const handleNumStatesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value =
            parseInt(event.target.value) <= 64
                ? parseInt(event.target.value)
                : 64;
        setNumStates(value);

        if (value <= names.length) {
            setNames(names.slice(0, value));
            setProbabilities(probabilities.slice(0, value));
        } else {
            const newNames = [...names];
            const newProbabilities = [...probabilities];
            for (let i = 0; i < value - names.length; i++) {
                newNames.push(`State ${names.length + i}`);
                newProbabilities.push(0);
            }
            setNames(newNames);
            setProbabilities(newProbabilities);
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

    const handleEqualProbability: MouseEventHandler<HTMLButtonElement> = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        const equalProbability = 1 / numStates;

        setProbabilities(probabilities.map((x) => equalProbability));
    };

    function parseObjectString(str: string): Record<string, number> {
        const obj: Record<string, number> = {};

        // Remove the curly braces from the input string
        str = str.slice(1, -1);

        // Split the string into key-value pairs
        const pairs = str.split(",");

        // Process each key-value pair
        for (const pair of pairs) {
            const [key, value] = pair
                .trim()
                .split(":")
                .map((s) => s.trim());
            obj[key] = parseFloat(value);
        }

        return obj;
    }

    function getBinaryDigits(num: number, numDigits: number): string {
        const binaryStr = num.toString(2);
        const paddingLength = numDigits - binaryStr.length;

        if (paddingLength <= 0) {
            return binaryStr;
        }

        const padding = "0".repeat(paddingLength);
        return padding + binaryStr;
    }

    const handleSimulation: MouseEventHandler<HTMLButtonElement> = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (
            Math.abs(probabilities.reduce((sum, num) => sum + num, 0) - 1) >
            0.00001
        ) {
            alert("Probabilities must equal 1");
            return;
        }

        let probabilityString = "";

        for (let i = 0; i < probabilities.length; i++) {
            if (i === probabilities.length - 1) {
                probabilityString += `${i}:${probabilities[i]}`;
                continue;
            }

            probabilityString += `${i}:${probabilities[i]}, `;
        }

        console.log(
            `/api/rng?probabilities=${probabilityString}&shots=${numShots}`
        );
        const response = await fetch(
            `/api/rng?probabilities=${probabilityString}&shots=${numShots}`
        );
        const data = await response.json();
        const parsedData = parseObjectString(data);
        setResultData(parsedData);
    };

    const renderSuperpositionFormula = () => {
        const terms = probabilities.map((probability, index) => {
            const stateName = `|${getBinaryDigits(index, Math.ceil(Math.log2(numStates)))}⟩`;
            const coefficient = Math.sqrt(probability).toFixed(4);
            return `${coefficient}${stateName}`;
        });

        const sqrtValue = probabilities.reduce((sum, num) => {
            return sum + Math.sqrt(num);
        }, 0);

        return `(1/√${sqrtValue.toFixed(4)})` + "[" + terms.join(" + ") + "]";
    };

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
                    max="64"
                    value={numStates}
                    onChange={handleNumStatesChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-8">
                <label htmlFor="numShots" className="mb-2 block font-bold">
                    Number of Shots:
                </label>
                <input
                    type="number"
                    id="numShots"
                    value={numShots}
                    onChange={handleNumShots}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {Array.from({ length: numStates }, (_, index) => (
                    <div key={index} className="rounded-lg bg-white p-6 shadow">
                        <div className="mb-4 flex items-center">
                            <p className="mr-2 bg-white text-xl font-bold">
                                |
                                {getBinaryDigits(
                                    index,
                                    Math.ceil(Math.log2(numStates))
                                )}
                                {">"} ({index})
                            </p>
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
                                step="0.01"
                                value={probabilities[index]}
                                onChange={(event) =>
                                    handleProbabilityChange(index, event)
                                }
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex-row py-10 pl-1">
                <button
                    onClick={handleEqualProbability}
                    className="mr-10 rounded-md bg-blue-500 px-6 py-3 text-lg font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Set Equal Probabilities
                </button>
                <button
                    onClick={handleSimulation}
                    className="rounded-md bg-blue-500 px-6 py-3 text-lg font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Simulate Quantum Sample
                </button>
            </div>

            <div className="mt-8">
                <h2 className="mb-4 text-2xl font-bold">Statistics</h2>
                <div className="rounded-lg bg-white p-6 shadow">
                    <p className="mb-2">
                        <strong>Number of Qubits:</strong>{" "}
                        {Math.ceil(Math.log2(numStates))}
                    </p>
                    <p className="mb-3">
                        <strong>Superposition Formula:</strong>
                    </p>
                    <textarea
                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        value={renderSuperpositionFormula()}
                        readOnly
                    />
                </div>
            </div>

            {resultData && <ResultTable resultData={resultData} />}
        </div>
    );
};

export default QuantumStateSimulator;
