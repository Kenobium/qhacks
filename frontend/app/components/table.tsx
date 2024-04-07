export const ResultTable: React.FC<{ resultData: Record<string, number> }> = ({
    resultData,
}) => {
    return (
        <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">Simulation Results</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">
                            Outcome
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Probability
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(resultData).map(
                        ([outcome, probability]) => (
                            <tr key={outcome}>
                                <td className="border border-gray-300 px-4 py-2">
                                    {outcome}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {probability.toFixed(4)}
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};
