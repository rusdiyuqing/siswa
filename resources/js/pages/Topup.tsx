import InputGroup from '@/components/InputGroup';
import AppLayout from '@/Layout/AppLayout';
import { Bank, Nominal, PaymentMethod } from '@/types'; // Anda perlu membuat types.ts untuk tipe data ini
import React, { useState } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import bca from '@/components/assets/bca.png'
import bri from '@/components/assets/bri.png'
import bni from '@/components/assets/bni.png'
import mandiri from '@/components/assets/mandiri.png'
import permata from '@/components/assets/permata.png'

interface TopupProps {
    onClose: () => void;
}

const Topup: React.FC<TopupProps> = ({ onClose }) => {
    // Daftar bank Indonesia
    const banks: Bank[] = [
        { id: 1, name: 'BCA', logo: bca },
        { id: 2, name: 'Mandiri', logo: mandiri },
        { id: 3, name: 'BNI', logo: bni },
        { id: 4, name: 'BRI', logo: bri },
        { id: 5, name: 'Permata', logo: permata },
    ];

    // Daftar nominal topup
    const nominals: Nominal[] = [
        { id: 1, amount: 50000 },
        { id: 2, amount: 100000 },
        { id: 3, amount: 200000 },
        { id: 4, amount: 500000 },
        { id: 5, amount: 1000000 },
    ];

    // Daftar metode pembayaran
    const paymentMethods: PaymentMethod[] = [
        { id: 1, name: 'Transfer Bank', code: 'bank_transfer' },
        { id: 2, name: 'Virtual Account', code: 'virtual_account' },
        { id: 3, name: 'E-Wallet', code: 'ewallet' },
    ];

    // State untuk form
    const [selectedBank, setSelectedBank] = useState<number | null>(null);
    const [selectedNominal, setSelectedNominal] = useState<number | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [customNominal, setCustomNominal] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Cek apakah memilih nominal fixed atau custom
        const nominalValue = customNominal
            ? parseInt(customNominal)
            : selectedNominal
              ? nominals.find((n) => n.id === selectedNominal)?.amount
              : null;

        if (!selectedBank || !nominalValue || !selectedPaymentMethod || !phoneNumber) {
            alert('Harap lengkapi semua data!');
            return;
        }

        // Proses pembayaran
        console.log({
            bank: selectedBank,
            nominal: nominalValue,
            paymentMethod: selectedPaymentMethod,
            phoneNumber,
        });

        alert('Proses topup berhasil!');
    };

    return (
        <AppLayout title="Top Up">
            <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <div className="flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground">
                    <button onClick={() => onClose()} className="flex items-center space-x-2">
                        <FaArrowAltCircleLeft className="text-primary-foreground" />
                        <span>Kembali</span>
                    </button>
                    <h1 className="text-2xl font-bold text-white">Topup Saldo</h1>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        {/* Pilih Bank */}
                        <div className="mb-6">
                            <h2 className="mb-3 text-lg font-semibold">Pilih Bank</h2>
                            <div className="grid grid-cols-3 gap-3">
                                {banks.map((bank) => (
                                    <button
                                        key={bank.id}
                                        type="button"
                                        className={`flex flex-col items-center rounded-lg border p-3 ${selectedBank === bank.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                                        onClick={() => setSelectedBank(bank.id)}
                                    >
                                        <img src={bank.logo} alt={bank.name} className="mb-1 h-8" />
                                        <span className="text-sm">{bank.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Pilih Nominal */}
                        <div className="mb-6">
                            <h2 className="mb-3 text-lg font-semibold text-primary">Pilih Nominal</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {nominals.map((nominal) => (
                                    <button
                                        key={nominal.id}
                                        type="button"
                                        className={`rounded-lg border p-3 transition-all ${
                                            selectedNominal === nominal.id
                                                ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                                                : 'border-primary bg-primary-foreground hover:bg-primary-foreground/40'
                                        }`}
                                        onClick={() => {
                                            setSelectedNominal(nominal.id);
                                            setCustomNominal(''); // Reset custom nominal ketika pilih nominal fixed
                                        }}
                                    >
                                        <div className="font-medium">Rp {nominal.amount.toLocaleString('id-ID')}</div>
                                    </button>
                                ))}

                                {/* Input Nominal Custom */}
                                <InputGroup
                                    onChange={(value) => {
                                        setCustomNominal(value ? String(value) : '');
                                        setSelectedNominal(null); // Reset selected nominal ketika input custom
                                    }}
                                    name="nominal"
                                    placeholder="Masukkan Nominal Topup Anda"
                                    value={customNominal}
                                    prefix="Rp"
                                    className="col-span-2"
                                    type="number"
                                />
                            </div>
                        </div>

                        {/* Pilih Metode Pembayaran */}
                        <div className="mb-6">
                            <h2 className="mb-3 text-lg font-semibold">Metode Pembayaran</h2>
                            <div className="space-y-2">
                                {paymentMethods.map((method) => (
                                    <div
                                        key={method.id}
                                        className={`cursor-pointer rounded-lg border p-3 ${selectedPaymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                                        onClick={() => setSelectedPaymentMethod(method.id)}
                                    >
                                        {method.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Nomor Handphone */}
                        <div className="mb-6">
                            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
                                Nomor Handphone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                className="w-full rounded-lg border border-gray-300 p-3"
                                placeholder="Contoh: 081234567890"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        {/* Tombol Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white transition duration-200 hover:bg-blue-700"
                        >
                            Lanjutkan Pembayaran
                        </button>
                    </form>
                </div>
            </div>

            {/* Informasi tambahan */}
            <div className="mx-auto mt-6 max-w-md rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-3 text-lg font-semibold">Informasi Penting</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Pastikan nomor handphone yang dimasukkan benar</li>
                    <li>Proses topup membutuhkan waktu 1-5 menit</li>
                    <li>Jika mengalami kendala, hubungi customer service kami</li>
                </ul>
            </div>
        </AppLayout>
    );
};

export default Topup;
