import DataSiswaContent from '@/components/siswa/DataSiswaContent';
import ExtrakulikulerContent from '@/components/siswa/ExtrakulikulerContent';
import TagihanContent from '@/components/siswa/TagihanContent';
import { Auth } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    FaExchangeAlt,
    FaFileInvoiceDollar,
    FaFootballBall,
    FaGraduationCap,
    FaIdCard,
    FaKey,
    FaTimes,
    FaUser,
    FaUserGraduate,
} from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import PinPage from './Pin';
import SetupPinPage from './SetupPin';

interface Siswa {
    nis?: string;
    nisn?: string;
    namlen?: string;
    nampan?: string;
    namman?: string;
    temlah?: string;
    tgllah?: string;
    jenkel?: string;
    tel?: string;
    ket?: string;
    sta?: string;
    staqd?: string;
    rev?: string;
    createdby?: string;
    updatedby?: string;
    kel?: string;
    ala?: string;
    pin?: string;
}

const menuItems = [
    {
        title: 'Tagihan',
        icon: <FaFileInvoiceDollar className="h-6 w-6 text-green-600" />,
        color: 'border-green-700 bg-green-50 hover:bg-green-100',
        content: <TagihanContent />,
    },
    {
        title: 'Data Siswa',
        icon: <FaUserGraduate className="h-6 w-6 text-amber-600" />,
        color: 'border-amber-700 bg-amber-50 hover:bg-amber-100',
        content: <DataSiswaContent />,
    },
    {
        title: 'Extrakulikuler', // Perhatikan penulisan "Ekstrakurikuler" yang benar
        icon: <FaFootballBall className="h-6 w-6 text-rose-600" />,
        color: 'border-rose-700 bg-rose-50 hover:bg-rose-100',
        content: <ExtrakulikulerContent />,
    },
];
export default function MenuDashboard() {
    const { auth, nouid, siswa, hasPin } = usePage<{ auth: Auth; siswa: Siswa; hasPin: boolean }>().props;
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const [openPin, setOpenPin] = useState(false);
    const [hasPined, setHasPined] = useState(hasPin);
    const [openSetupPin, setOpenSetupPin] = useState(false);
    const handleMasukPin = () => {
        setOpenPin(true);
    };
    const handleSetupPin = () => {
        setOpenSetupPin(true);
    };
    return (
        <div className="mx-auto min-h-screen max-w-2xl p-4">
            <Head title={siswa?.namlen ?? 'Login'} />
            <div className="mb-6 flex flex-col items-center gap-2 rounded-lg bg-card p-4 text-card-foreground shadow-sm">
                <div className="flex w-full flex-1 flex-col items-start border-b-2 pb-8">
                    <div className="flex items-center space-x-3">
                        <FaUser className="flex-shrink-0 text-xl" />
                        <h2 className="truncate text-xl font-semibold md:text-2xl">{siswa ? siswa.namlen : '******'}</h2>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaIdCard className="flex-shrink-0 text-lg" />
                        <p className="text-base md:text-lg">NIS: {siswa ? siswa.nis : '*****'}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaGraduationCap className="flex-shrink-0 text-lg" />
                        <p className="text-base md:text-lg">Kelas: {siswa ? siswa.kel : '******'}</p>
                    </div>
                </div>
                {/* Action Buttons */}
                <div className="grid w-full grid-cols-2 items-center gap-4">
                    {auth.user ? (
                        <Link
                            href={route('siswa.logout', String(nouid))}
                            method="post"
                            className="flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-red-800 px-4 py-3 text-white shadow-sm transition-colors hover:bg-red-700"
                        >
                            <FiLogOut className="text-lg" />
                            <span>Keluar</span>
                        </Link>
                    ) : (
                        <button
                            onClick={() => handleMasukPin()}
                            className="flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50"
                        >
                            <FaKey className="text-lg" />
                            <span>Masukan PIN</span>
                        </button>
                    )}

                    <button
                        onClick={() => handleSetupPin()}
                        className="flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50"
                    >
                        <FaExchangeAlt className="text-lg" />
                        <span>{hasPined ? 'Ubah PIN' : 'Buat Pin'}</span>
                    </button>
                </div>
            </div>

            {/* <div className="mb-3 rounded-lg bg-card p-4 text-card-foreground shadow-sm">
                <div className="border-b border-primary/10 pb-3">
                    <span className="text-sm font-medium">Saldo Tabungan</span>
                    <h1 className="mt-1 text-2xl font-bold">Rp2.000.000</h1>
                </div>

                <div className="mt-3 flex justify-between gap-2">
                    <button
                        className="flex flex-1 flex-col items-center justify-center rounded-lg bg-primary p-3 transition-colors duration-200 hover:bg-sky-500/80"
                        onClick={() => null}
                    >
                        <FaMoneyBillAlt className="h-6 w-6" />
                        <span className="mt-2 text-sm font-medium">Top Up</span>
                    </button>

                    <button
                        className="flex flex-1 flex-col items-center justify-center rounded-lg bg-primary p-3 transition-colors duration-200 hover:bg-sky-500/80"
                        onClick={() => null}
                    >
                        <FaHistory className="h-6 w-6" />
                        <span className="mt-2 text-sm font-medium">Riwayat</span>
                    </button>
                </div>
            </div>
            <div className="mb-6 grid grid-cols-3 gap-4 sm:grid-cols-5">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        className={`flex flex-col items-center justify-center rounded-xl border border-t-5 p-2 transition duration-200 ${item.color}`}
                        onClick={() => setActiveItem(index)}
                    >
                        {item.icon}
                        <span className="mt-2 text-center text-sm font-semibold text-gray-800">{item.title}</span>
                    </button>
                ))}
            </div> */}

            {activeItem !== null && (
                <div className="relative rounded-xl border border-t-4 border-gray-800 bg-blue-50 p-6 shadow-lg">
                    <button
                        onClick={() => setActiveItem(null)}
                        className="absolute top-3 right-3 text-gray-500 transition hover:text-red-500"
                        aria-label="Tutup"
                    >
                        <FaTimes className="h-5 w-5" />
                    </button>
                    {menuItems[activeItem].content}
                </div>
            )}
            <PinPage
                setOpenSetupPin={() => {
                    setOpenSetupPin(true);
                    setOpenPin(false);
                }}
                hasPin={hasPined}
                open={openPin}
                onClose={() => setOpenPin(false)}
            />
            <SetupPinPage setHasPined={()=>setHasPined(true)} hasPin={hasPined} open={openSetupPin} onClose={() => setOpenSetupPin(false)} />
        </div>
    );
}
