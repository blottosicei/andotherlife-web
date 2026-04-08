'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

declare global {
  interface Window {
    naver: any;
  }
}

interface NaverMapProps {
  address?: string;
  lat?: number;
  lng?: number;
  height?: string;
}

const DEFAULT_LAT = 37.5540;
const DEFAULT_LNG = 126.9164;
const DEFAULT_ADDRESS = '서울시 마포구 잔다리로 73, 5층';

export function NaverMap({
  address = DEFAULT_ADDRESS,
  lat = DEFAULT_LAT,
  lng = DEFAULT_LNG,
  height = '400px',
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

  useEffect(() => {
    if (!clientId) {
      setHasError(true);
      return;
    }

    if (window.naver?.maps) {
      initMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
    script.async = true;
    script.onload = () => {
      initMap();
    };
    script.onerror = () => setHasError(true);
    document.head.appendChild(script);
  }, [clientId]);

  function initMap() {
    if (!mapRef.current || !window.naver?.maps) return;

    const position = new window.naver.maps.LatLng(lat, lng);

    const map = new window.naver.maps.Map(mapRef.current, {
      center: position,
      zoom: 16,
      zoomControl: false,
      scaleControl: false,
      mapDataControl: false,
    });

    const marker = new window.naver.maps.Marker({
      position,
      map,
      title: '앤아더라이프 심리상담연구소',
    });

    const infoWindow = new window.naver.maps.InfoWindow({
      content: `
        <div style="padding: 12px 16px; font-size: 13px; line-height: 1.6; min-width: 200px;">
          <strong style="font-size: 14px;">앤아더라이프 심리상담연구소</strong><br/>
          ${address}<br/>
          <span style="color: #5c605d;">합정역 도보 5분 · 홍대입구역 도보 10분</span>
        </div>
      `,
    });

    infoWindow.open(map, marker);
  }

  if (hasError || !clientId) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-2xl bg-[#eceeeb]"
        style={{ height }}
      >
        <MapPin className="mb-3 h-8 w-8 text-[#2d6a4f]" />
        <p className="text-sm font-medium text-[#2f3331]">
          앤아더라이프 심리상담연구소
        </p>
        <p className="mt-1 text-xs text-[#5c605d]">{address}</p>
        <p className="text-xs text-[#5c605d]">
          합정역 도보 5분 · 홍대입구역 도보 10분
        </p>
        <a
          href={`https://map.naver.com/v5/search/${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 rounded-lg bg-[#2d6a4f] px-4 py-2 text-xs font-medium text-white hover:bg-[#1f5e44] transition-colors"
        >
          네이버 지도에서 보기
        </a>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="rounded-2xl overflow-hidden"
      style={{ height, width: '100%' }}
    />
  );
}
