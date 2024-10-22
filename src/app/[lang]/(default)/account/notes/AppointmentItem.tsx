'use client';
import { useEffect, useState } from 'react';
import { getMyFiles, addNote, editNote, deleteNote } from "./actions";
import { timeMinuteConverter } from "@/lib/utils";

interface DentistInfo {
    id: number;
    name: string;
    last_name: string;
    url: string;
    degree: any;
    branch: any;
}

interface ClinicInfo {
    id: number;
    url: string;
    name: string;
    type: any;
}

interface AppointmentData {
    appointment_type: string;
    day: string;
    start_min: string;
    end_min: string;
    dentist: DentistInfo;
    clinic: ClinicInfo;
    id: number;
}

interface AppointmentItemProps {
    appointment: AppointmentData;
    token: string;
}

export default function AppointmentItem({ appointment, token }: AppointmentItemProps) {
    const [relatedFiles, setRelatedFiles] = useState<{ rows: any[], totalRows: string }>({ rows: [], totalRows: '' });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<{ [key: number]: File | null }>({});
    const [fileName, setFileName] = useState<{ [key: number]: string }>({});
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [noteText, setNoteText] = useState<string>('');
    const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
    const [expandedNotes, setExpandedNotes] = useState<{ [key: number]: boolean }>({});

    const monthNamesArr = [
        { "tr": "Ocak", "en": "January" },
        { "tr": "Şubat", "en": "February" },
        { "tr": "Mart", "en": "March" },
        { "tr": "Nisan", "en": "April" },
        { "tr": "Mayıs", "en": "May" },
        { "tr": "Haziran", "en": "June" },
        { "tr": "Temmuz", "en": "July" },
        { "tr": "Ağustos", "en": "August" },
        { "tr": "Eylül", "en": "September" },
        { "tr": "Ekim", "en": "October" },
        { "tr": "Kasım", "en": "November" },
        { "tr": "Aralık", "en": "December" },
    ];

    const daysNamesArr = [
        { "tr": "Pazartesi", "en": "Monday" },
        { "tr": "Salı", "en": "Tuesday" },
        { "tr": "Çarşamba", "en": "Wednesday" },
        { "tr": "Perşembe", "en": "Thursday" },
        { "tr": "Cuma", "en": "Friday" },
        { "tr": "Cumartesi", "en": "Saturday" },
        { "tr": "Pazar", "en": "Sunday" },
    ];

    useEffect(() => {
        async function fetchRelatedFiles() {
            try {
                const files = await getMyFiles(String(appointment.id), token);
                setRelatedFiles(files);
            } catch (error) {
                setError('İlgili dosyalar çekilemedi');
            } finally {
                setLoading(false);
            }
        }

        fetchRelatedFiles();
    }, [appointment.id, token]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, appointmentId: number) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setSelectedFile(prevState => ({ ...prevState, [appointmentId]: files[0] }));
        }
    };

    const handleAddNote = async () => {
        try {
            await addNote(String(appointment.id), noteText, token);
            setNoteText('');
            setShowPopup(false);
            // Refresh the list of notes
            const files = await getMyFiles(String(appointment.id), token);
            setRelatedFiles(files);
        } catch (error) {
            setError('Not eklenemedi');
        }
    };

    const handleEditNote = async () => {
        try {
            if (editingNoteId !== null) {
                await editNote(editingNoteId.toString(), noteText, token.toString());
                setNoteText('');
                setShowPopup(false);
                setEditingNoteId(null);
                const files = await getMyFiles(String(appointment.id), token);
                setRelatedFiles(files);
            }
        } catch (error) {
            setError('Not düzenlenemedi');
        }
    };

    const handleDeleteNote = async (noteId: number) => {
        const confirmation = confirm('Bu notu silmek istediğinden emin misin?');
        if (!confirmation) return;

        try {
            await deleteNote(String(noteId), token);
            // Refresh the list of notes
            const files = await getMyFiles(String(appointment.id), token);
            setRelatedFiles(files);
        } catch (error) {
            setError('Not silinemedi');
        }
    };

    const openPopup = (noteId: number | null = null, noteText: string = '') => {
        setEditingNoteId(noteId);
        setNoteText(noteText);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setNoteText('');
        setEditingNoteId(null);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    const firstFiveLines = relatedFiles.rows.map((file) => {
        const lines = file.note.split('\n');
        return lines.slice(0, 5).join('\n');
    });

    return (
        <div className="p-4 text-xs font-medium text-gray-800 rounded tracking-wide bg-gray-50 leading-5">
            <div style={{ color: appointment.appointment_type === 'in_person' ? '#7334e0' : '#24aa30' }}>
                {appointment.appointment_type === 'in_person' ? 'Klinikte Görüş' : 'Online'}
            </div>
            <div className='font-semibold text-sm'>{appointment.clinic.name}</div>
            <div className='font-medium text-xs'>{appointment.dentist.degree['tr']} {appointment.dentist.name} {appointment.dentist.last_name}</div>
            <span className='text-gray-300 text-xs font-normal text-inherit'>
                {`${appointment.day.split('-')[2]} ${monthNamesArr[parseInt(appointment.day.split('-')[1]) - 1].tr} ${(() => {
                    const date = new Date(appointment.day);
                    const dayIndex = date.getDay();
                    return daysNamesArr[dayIndex - 1].tr;
                })()
                    } ${timeMinuteConverter(parseInt(appointment.start_min))}`}
            </span>
            <div className='flex items-center justify-between mt-2'>
                <div className='mt-1'>İlgili yüklenen notlar:</div>
                <div className='w-[50%] mt-1'>
                    <button
                        className="flex float-right bg-[#7334e0] hover:bg-blue-700 text-white font-normal py-1 px-2 rounded"
                        onClick={() => openPopup()}
                    >
                        <span className='ml-0 flex items-center'><svg className='float-left mr-2' width="15px" height="15px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                                <g id="Icon-Set" transform="translate(-464.000000, -1087.000000)" fill="#fff">
                                    <path d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z" id="plus-circle">
                                    </path>
                                </g>
                            </g>
                        </svg> <span>Not Ekle</span></span>
                    </button>

                    {showPopup && (
                        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50'>
                            <div className="lg:w-1/2 sm:mx-auto sm:w-full relative absolute bg-white p-4 mt-14 shadow-lg shadow-[0px_0px_300px_200px_rgba(0,0,0,0.9)] left-0 rounded-lg">
                                <textarea
                                    className="w-full min-h-[50vh] border border-gray-300 rounded p-2 mb-2"
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    placeholder="Notunu buraya gir..."
                                />
                                <div className="flex justify-end">
                                    {editingNoteId !== null ? (
                                        <button
                                            className={`flex float-right bg-[#7334e0] mr-2 ${noteText.trim() === '' ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-blue-700'} text-white font-normal py-1 px-2 rounded`}
                                            onClick={() => {
                                                if (noteText.trim() !== '') {
                                                    handleEditNote();
                                                }
                                            }}
                                            disabled={noteText.trim() === ''}
                                        >
                                            <span className="ml-2">Notu Düzenle</span>
                                        </button>
                                    ) : (
                                        <button
                                            className={`flex float-right bg-[#7334e0] mr-2 ${noteText.trim() === '' ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-blue-700'} text-white font-normal py-1 px-2 rounded`}
                                            onClick={() => {
                                                if (noteText.trim() !== '') {
                                                    handleAddNote();
                                                }
                                            }}
                                            disabled={noteText.trim() === ''}
                                        >
                                            <span className='ml-0 flex items-center'><svg className='float-left mr-2' width="15px" height="15px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                                                    <g id="Icon-Set" transform="translate(-464.000000, -1087.000000)" fill="#fff">
                                                        <path d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z" id="plus-circle">
                                                        </path>
                                                    </g>
                                                </g>
                                            </svg> <span>Not Ekle</span></span>
                                        </button>
                                    )}
                                    <button
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-normal py-1 px-2 rounded"
                                        onClick={closePopup}
                                    >
                                        İptal
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='outline-[#e4e4e4] outline-dashed outline-2 p-2 mt-2'>
                {loading ? (
                    <div>Yükleniyor...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : relatedFiles.rows.length === 0 ? (
                    <div>Bu randevuya ait not bulunmuyor!</div>
                ) : (
                    <ul className=''>
                        {relatedFiles.rows.map((file, index) => (
                            <li className='mb-2' key={index}>
                                <div className="flex items-start gap-1">
                                    <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
                                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                            <span className="text-xs font-medium text-gray-900 ">{file.uploaded_by === 'dentist' ? file.dentist : file.patient}
                                            </span>
                                        </div>

                                        {expandedNotes[index] ? (
                                            <div className="overflow-hidden text-xs font-normal py-1 text-gray-900">
                                                {firstFiveLines[index]}
                                                {file.note.length > firstFiveLines[index].length && (
                                                    <button
                                                        className="text-blue-600 hover:underline"
                                                        onClick={() => setExpandedNotes(prevState => ({ ...prevState, [index]: !prevState[index] }))}
                                                    >
                                                        ...Daha Fazla
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="overflow-hidden text-xs font-normal py-0 text-gray-900 dark:text-white line-clamp-3">
                                                {firstFiveLines[index]}
                                                {file.note.length > firstFiveLines[index].length && (
                                                    <button
                                                        className="text-blue-600 hover:underline"
                                                        onClick={() => setExpandedNotes(prevState => ({ ...prevState, [index]: !prevState[index] }))}
                                                    >
                                                        ...Daha Fazla
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                        <button
                                            className="flex float-right bg-[#7334e0] hover:bg-blue-700 text-white font-normal py-1 mb-2 px-2 rounded"
                                            onClick={() => setExpandedNotes(prevState => ({ ...prevState, [index]: !prevState[index] }))}
                                            style={{ display: file.note.length <= 200 ? 'none' : 'block' }}
                                        >
                                            <span className="ml-2">{expandedNotes[index] ? 'Azalt' : 'Daha Fazla Gör'}</span>
                                        </button>
                                    </div>
                                    {file.uploaded_by === 'dentist' ? (
                                        ''
                                    ) : (
                                        <div className='flex flex-col p-1'>

                                            <button
                                                className="flex float-right bg-orange-500 hover:bg-yellow-600 text-white font-normal py-1 mb-2 px-2 rounded"
                                                onClick={() => openPopup(file.id, file.note)}
                                            >
                                                <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#fff" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round" />
                                                    <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#fff" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                            <button
                                                className="flex float-right bg-red-700 hover:bg-red-700 text-white font-normal py-1 mb-2 px-2 rounded"
                                                onClick={() => handleDeleteNote(file.id)}
                                            >
                                                <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 11V17" stroke="#fff" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round" />
                                                    <path d="M14 11V17" stroke="#fff" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round" />
                                                    <path d="M4 7H20" stroke="#fff" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round" />
                                                    <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round" />
                                                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
