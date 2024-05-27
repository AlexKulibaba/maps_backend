"use client";

import GoogleMap from "@/components/google-map";
import Map from "@/components/map";
import axios from "axios";

import Image from "next/image";
import { use, useEffect, useState } from "react";

export interface Marker {
  name: string;
  type: string;
  description: string;
  position: {
    lat: number;
    lng: number;
  };
}
export default function Home() {
  const [markers, setMarkers] = useState<Marker[]>([
    {
      name: "test",
      type: "test",
      description: "test",
      position: {
        lat: 50.7753,
        lng: 6.0839,
      },
    },
    {
      name: "test",
      type: "test",
      description: "test",
      position: {
        lat: 50.7744,
        lng: 6.0855,
      },
    },
    {
      name: "test",
      type: "test",
      description: "test",
      position: {
        lat: 50.7797,
        lng: 6.0765,
      },
    },
    {
      name: "test",
      type: "test",
      description: "test",
      position: {
        lat: 50.7923,
        lng: 6.1195,
      },
    },
    {
      name: "test",
      type: "test",
      description: "test",
      position: {
        lat: 50.7734,
        lng: 6.0722,
      },
    },
    {
      name: "test",
      type: "test",
      description: "test",
      position: {
        lat: 50.7757,
        lng: 6.0215,
      },
    },
    {
      name: "test",
      type: "test",
      description: "test",
      position: {
        lat: 50.7706,
        lng: 6.0912,
      },
    },
    {
      name: "test",
      type: "test",
      description: "test",
      position: {
        lat: 50.7771,
        lng: 6.1674,
      },
    },
    {
      name: "test",
      type: "test",
      description: "test",
      position: {
        lat: 50.776,
        lng: 6.0827,
      },
    },
    {
      name: "test",
      type: "test",
      description: "test",
      position: {
        lat: 50.7718,
        lng: 6.0814,
      },
    },
  ]);

  function getCoordinatesArray(
    inputArray: string[]
  ): Array<{ lat: number; lng: number }> {
    const regex = /<(\d+\.\d+),(\d+\.\d+)>/;
    return inputArray.map((input) => {
      const match = input.match(regex);
      if (match) {
        return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
      }
      return { lat: 0, lng: 0 };
    });
  }

  const getMarkers = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://digital-vereinfacht.ninoxdb.de/v1/teams/xk9zrexbm17q6bfqc/databases/lryyv6de5s5z/query?query=(select Projekte).Ort",
        headers: {
          Authorization: "Bearer 40d25de0-19b8-11ef-b4f9-09d220c0ba76",
          "Content-Type": "application/json",
        },
      };

      const data = await axios.request(config).then((response) => {
        const data = response.data;
        return data;
      });
      return data;
    } catch (e) {
      console.log("[CODE_ERROR]", e);
    }
  };

  useEffect(() => {
    getMarkers().then((data) => {
      console.log(data);
      const coordinates = getCoordinatesArray(data).map((coordinate) => {
        return {
          name: "test",
          type: "test",
          description: "test",
          position: {
            lat: coordinate.lat,
            lng: coordinate.lng,
          },
        };
      });
      console.log(coordinates);

      setMarkers(coordinates);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <GoogleMap markers={markers} />
    </main>
  );
}
