'use client';
 
import * as React from 'react';
import { useEdgeStore } from '@/lib/edgeStore';
import { createProductAction } from '@/actions/createListing';
 
export default function Page() {
  const [file, setFile] = React.useState<File>();
  const { edgestore } = useEdgeStore();
 
  return (
    <div>
      <form>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <button
          type="submit"
      >
        Upload
      </button>

      </form>
    </div>
  );
}
