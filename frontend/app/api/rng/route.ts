import { PythonShell, Options } from 'python-shell';

export async function GET(request: Request) {

  try {
    // Set up Python options
    const pythonOptions: Options = {
      mode: 'text',
      pythonPath: '/Users/dhruv/qhacks/.venv/bin/python3.12', // Replace with the path to your Python executable
      scriptPath: '/Users/dhruv/qhacks', // Replace with the path to your Python script
      args: ["0:0.1, 1:0.2, 2:0.3, 63:0.4", "8192"]
    };

    // Execute Python script
    const pythonShell = new PythonShell('rng.py', pythonOptions);
    // Collect the result
    let result = '';
    pythonShell.on('message', (message: string) => {
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
    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error executing Python script' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}