"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Nook {
  id: string;
  title: string;
  url: string;
}

export default function DashboardPage() {
  const [nooks, setNooks] = useState<Nook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNooks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/nooks");

        if (!response.ok) {
          throw new Error("Failed to fetch nooks");
        }

        const data = await response.json();
        setNooks(data);
      } catch (err) {
        console.error("Error fetching nooks:", err);
        setError("Failed to load nooks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNooks();
  }, []);

  if (loading) {
    return <div>Loading nooks...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Nook Dashboard
      </h1>

      {nooks.length === 0 ? (
        <p>No nooks saved yet. Add some from the extension!</p>
      ) : (
        nooks.map((nook) => (
          <Card className="w-full" key={nook.id}>
            <CardHeader>
              <CardTitle>{nook.title}</CardTitle>
              <CardDescription>
                <a
                  href={nook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {nook.url}
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Saved bookmark</p>
            </CardContent>
            <CardFooter>
              <a
                href={nook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                Visit Link
              </a>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
