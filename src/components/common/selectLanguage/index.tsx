'use client'
import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import smoothScrollToTop from "@/fundamental/smoothScrollToTop";
import locales from './locales.json';

const SelectLanguage: React.FC = () => {
const [dropDirection, setDropDirection] = useState<'down' | 'up'>('down');

    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const handleChange = async (locale: string) => {
        if (locale === currentLocale) {
            if (open) setOpen(false);
            return;
        }
        await smoothScrollToTop();
        const segments = pathname.split('/');
        segments[1] = locale;
        const newPath = segments.join('/');
        if (open) setOpen(false);
        router.push(newPath);
    }
    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    useEffect(() => {
        if (open && dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            const dropdownHeight = 12 * 3 + 16; // height of one item (h-12) × number of items (approx) + padding
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;

            if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
                setDropDirection('up');
            } else {
                setDropDirection('down');
            }
        }
    }, [open])
    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button onClick={() => setOpen(!open)}
                className="flex cursor-pointer items-center space-x-2  w-full h-12 rounded-[12px] pl-[30px]  border border-[#E5E5E5] px-3 py-2.5">
                <img src={locales.find(l => l.code === currentLocale)?.flag} className="w-5 h-5" />
                <span>{locales.find(locale => locale.code === currentLocale)?.label}</span>
                <img className={`absolute top-3 left-[3px] ${open ? 'rotate-180' : ''}`} src="/images/arrow-down.png" alt="" />
            </button>
            {
                open &&
                <ul className={`absolute w-full bg-white shadow rounded mt-1 ${dropDirection === "up" ?'bottom-full mb-2':""}`}>
                    {locales.map(locale => (
                        <li
                            key={locale.code}
                            className="flex cursor-pointer items-center space-x-2  w-full h-12 pl-[30px] border border-[#E5E5E5] px-3 py-2.5"
                            onClick={() => handleChange(locale.code)}
                        >
                            <img src={locale?.flag} className="w-5 h-5" />
                            <span>{locale?.label}</span>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}
export default SelectLanguage;