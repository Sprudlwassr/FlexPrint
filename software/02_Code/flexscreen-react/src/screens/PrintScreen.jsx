import { useState } from 'react';

const mockFiles = [
  { id: 1, type: 'folder', name: 'Tests',                   modified: '2022-08-09 03:21' },
  { id: 2, type: 'file',   name: 'Tapa step up 0.24 PETG',  uploaded: '2022-09-14 10:52', size: '560.7 kB', printTime: '26m' },
  { id: 3, type: 'file',   name: 'Caja step up 0.24 PETG',  uploaded: '2022-09-14 09:03', size: '2.4 MB',   printTime: '56m' },
  { id: 4, type: 'file',   name: 'pa28 luz 0.12 PETG',      uploaded: '2022-08-14 05:53', size: '1.1 MB',   printTime: '1h 12m' },
  { id: 5, type: 'file',   name: 'Base plate v3',            uploaded: '2022-07-22 11:10', size: '340.2 kB', printTime: '18m' },
  { id: 6, type: 'file',   name: 'Enclosure clip',          uploaded: '2022-06-05 08:44', size: '89.4 kB',  printTime: '9m' },
];

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none"
       stroke="#bd9a76" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const PrintIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
);

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);

const PrintScreen = () => {
  const [sortBy, setSortBy] = useState('name');

  const sorted = [...mockFiles].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    const dateA = a.modified || a.uploaded || '';
    const dateB = b.modified || b.uploaded || '';
    return dateB.localeCompare(dateA);
  });

  return (
    <div className="printScreen">
      {/* Sort bar */}
      <div className="printSortBar">
        <span className="printSortLabel">Sort:</span>
        <button
          className={`printSortBtn ${sortBy === 'name' ? 'printSortBtnActive' : ''}`}
          onClick={() => setSortBy('name')}
        >Name</button>
        <button
          className={`printSortBtn ${sortBy === 'date' ? 'printSortBtnActive' : ''}`}
          onClick={() => setSortBy('date')}
        >Date</button>
        <button className="printRefreshBtn"><RefreshIcon /></button>
      </div>

      {/* File list */}
      <div className="printFileList">
        {sorted.map(item => (
          item.type === 'folder' ? (
            <div key={item.id} className="printFileItem">
              <span className="printFileIcon"><FolderIcon /></span>
              <div className="printFileMeta">
                <span className="printFileName">{item.name}</span>
                <span className="printFileDetail">Modified {item.modified}</span>
              </div>
            </div>
          ) : (
            <div key={item.id} className="printFileItem">
              <span className="printFileIcon"><FileIcon /></span>
              <div className="printFileMeta">
                <span className="printFileName">{item.name}</span>
                <span className="printFileDetail">Uploaded: {item.uploaded}</span>
                <span className="printFileDetail">Size: {item.size} &nbsp;·&nbsp; Print Time: {item.printTime}</span>
              </div>
              <button className="printActionBtn"><PrintIcon /></button>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default PrintScreen;
