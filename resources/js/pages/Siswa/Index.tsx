import DataSiswaContent from '@/components/siswa/DataSiswaContent';
import ExtrakulikulerContent from '@/components/siswa/ExtrakulikulerContent';
import TagihanContent from '@/components/siswa/TagihanContent';
import { useRefreshData } from '@/hooks/use-refresh-data';
import { Auth } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    FaFileInvoiceDollar,
    FaFootballBall,
    FaGraduationCap,
    FaHistory,
    FaIdCard,
    FaMoneyBillAlt,
    FaSignOutAlt,
    FaTimes,
    FaUser,
    FaUserGraduate,
} from 'react-icons/fa';
import PinPage from './Pin';
import SetupPinPage from './SetupPin';

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
    const { auth, toggle, nouid } = usePage<{ auth: Auth; toggle: 'log' | 'reg' | null }>().props;
    const { data, refreshData, isRefreshing } = useRefreshData<Auth>('auth', auth);

    const [open, setOpen] = useState(true);
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const student = auth.user;
    console.log();

    return (
        <div className="mx-auto min-h-screen w-full max-w-5xl p-4">
            <Head title={auth.user?.namlen ?? 'Login'} />
            <div className="mb-6 flex flex-col items-center gap-6 rounded-lg bg-card p-4 text-card-foreground shadow-sm sm:flex-row">
                <div className="flex w-full flex-1 flex-col items-center space-y-4 sm:items-start">
                    <div className="w-full max-w-md">
                        <div className="flex items-center space-x-3">
                            <FaUser className="flex-shrink-0 text-xl" />
                            <h2 className="truncate text-xl font-semibold md:text-2xl">{student ? student.namlen : '******'}</h2>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaIdCard className="flex-shrink-0 text-lg" />
                            <p className="text-base md:text-lg">NIS: {student ? student.nis : '*****'}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaGraduationCap className="flex-shrink-0 text-lg" />
                            <p className="text-base md:text-lg">Kelas: {student ? student.kel : '******'}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <Link
                        href={route('siswa.logout', String(nouid))}
                        method="post"
                        as="button"
                        className="flex items-center justify-center rounded-full bg-red-800 p-3 text-white transition-colors hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                        title="Logout"
                    >
                        <span className="px-2">Keluar</span>
                        <FaSignOutAlt className="text-lg" />
                    </Link>
                </div>
            </div>

            <div className="mb-3 rounded-lg bg-card p-4 text-card-foreground shadow-sm">
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
            {toggle === 'log' && <PinPage />}
            {toggle === 'reg' && <SetupPinPage />}
        </div>
    );
}
