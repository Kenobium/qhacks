import { PythonShell, Options } from "python-shell";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const probabilities = searchParams.get("probabilities") ?? "1:0.8, 2:0.2";
    const shots = searchParams.get("shots") ?? "100";

    try {
        // Set up Python options
        const pythonOptions: Options = {
            mode: "text",
            pythonPath: "/opt/homebrew/bin/python3.11", // Replace with the path to your Python executable
            scriptPath: "/Users/pmoharana/repos/projects/qhacks", // Replace with the path to your Python script
            args: [probabilities, shots],
        };

        // Execute Python script
        const pythonShell = new PythonShell("rng.py", pythonOptions);
        // Collect the result
        let result = "";
        pythonShell.on("message", (message: string) => {
            result += message;
        });

        // Wait for the Python script to finish
        await new Promise<void>((resolve, reject) => {
            pythonShell.end((err: Error | null) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Send the result back to the Client Component
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: "Error executing Python script" }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
