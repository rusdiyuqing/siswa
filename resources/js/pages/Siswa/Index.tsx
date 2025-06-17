import DataSiswaContent from '@/components/siswa/DataSiswaContent';
import ExtrakulikulerContent from '@/components/siswa/ExtrakulikulerContent';
import TagihanContent from '@/components/siswa/TagihanContent';
import AppLayout from '@/Layout/AppLayout';
import { Auth } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    FaExchangeAlt,
    FaFileInvoiceDollar,
    FaFootballBall,
    FaGraduationCap,
    FaHistory,
    FaIdCard,
    FaKey,
    FaPlusCircle,
    FaTimes,
    FaUser,
    FaUserGraduate,
    FaWallet,
} from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import Topup from '../Topup';
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
    const [page, setPage] = useState<'index' | 'topup' | 'riwayat'>('index');
    const [openPin, setOpenPin] = useState(false);
    const [hasPined, setHasPined] = useState(hasPin);
    const [openSetupPin, setOpenSetupPin] = useState(false);
    const handleMasukPin = () => {
        setOpenPin(true);
    };
    const handleSetupPin = () => {
        setOpenSetupPin(true);
    };
    const handlePage = (page: 'index' | 'topup' | 'riwayat') => {
        setPage(page);
    };
    return page === 'index' ? (
        <AppLayout title={siswa?.namlen ?? 'Login'}>
            <div className="flex w-full flex-col items-start rounded-t-lg bg-white p-4 px-6">
                <div className="flex items-center space-x-3">
                    <FaUser className="flex-shrink-0 text-xl text-primary" />
                    <h2 className="truncate text-xl font-semibold text-primary md:text-2xl">{siswa ? siswa.namlen : '******'}</h2>
                </div>
                <div className="flex items-center space-x-3">
                    <FaIdCard className="flex-shrink-0 text-lg text-primary" />
                    <p className="text-primary md:text-lg">NIS: {siswa ? siswa.nis : '*****'}</p>
                </div>
                <div className="flex items-center space-x-3">
                    <FaGraduationCap className="flex-shrink-0 text-lg text-primary" />
                    <p className="text-primary md:text-lg">Kelas: {siswa ? siswa.kel : '******'}</p>
                </div>
            </div>
            <div className="grid w-full grid-cols-2 items-center gap-4 border-b-2 p-2 px-6">
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
            <div className="flex w-full shadow-[0px_10px_10px_-4px_rgba(0,0,0,0.1)] shadow-black">
                <div className="grid w-full grid-cols-2 items-center gap-4 p-4 px-6">
                    {/* Saldo Section */}
                    <div className="space-y-2">
                        <h1 className="text-lg font-semibold text-primary-foreground">Saldo Tabungan</h1>
                        <div className="flex items-center gap-2 text-primary-foreground">
                            <FaWallet className="text-xl" />
                            <span className="text-xl font-bold">Rp. 500.000</span>
                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex flex-row items-end justify-end gap-2">
                        <button
                            onClick={() => handlePage('topup')}
                            className="flex items-center gap-2 rounded-md bg-primary-foreground px-4 py-2 text-primary hover:bg-accent"
                        >
                            <FaPlusCircle />
                            <span>Topup</span>
                        </button>
                        <button className="flex items-center gap-2 rounded-md bg-primary-foreground px-4 py-2 text-primary hover:bg-accent">
                            <FaHistory />
                            <span>Riwayat</span>
                        </button>
                    </div>
                </div>
            </div>
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
            <SetupPinPage setHasPined={() => setHasPined(true)} hasPin={hasPined} open={openSetupPin} onClose={() => setOpenSetupPin(false)} />
        </AppLayout>
    ) : (
        page === 'topup' && <Topup onClose={() => setPage('index')} />
    );
}
