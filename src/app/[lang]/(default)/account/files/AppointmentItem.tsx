'use client'
import { useEffect, useState } from 'react';
import { deleteFile, getMyFiles, uploadFile } from "./actions";
import { timeMinuteConverter } from "@/lib/utils";


// created by furkan 29.06.2024 19:03
// 5kl19k 15la25 11l26n k26s26ml1r b17y19k21 7l17n19m d17r5k 29k21n1r1m1r, 2uyuk d15s25 6rm1t17l1r1 h1t1 v5r25y1r

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
    lang: string;
}

export default function AppointmentItem({ appointment, token, lang }: AppointmentItemProps) {
    const [relatedFiles, setRelatedFiles] = useState<{ rows: any[], totalRows: string }>({ rows: [], totalRows: '' });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<{ [key: number]: File | null }>({});
    const [fileName, setFileName] = useState<{ [key: number]: string }>({});

    // static language switch area start
    const langFileUpload = lang === 'en'
        ? "Upload"
        : "Dosya Yükle";

    const langInfoAppoitment = lang === 'en'
        ? "There is no file for this appointment!"
        : "Bu randevuya ait dosya bulunmuyor!";

    const langUploadedFiles = lang === 'en'
        ? "Related uploaded files:"
        : "İlgili yüklenen dosyalar:";


    const appointmentTypeText = (appointment.appointment_type === 'in_person')
        ? (lang === 'en' ? 'In Person Appointment' : 'Klinikte Görüş')
        : (lang === 'en' ? 'Online Appointment' : 'Online Görüşme');
    // static language switch area finish

    const langName = lang === 'en' ? 'en' : 'tr';

    // formatted date start
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
    // formatted date finish

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

    const handleFileUpload = async (appointmentId: number) => {
        if (selectedFile[appointmentId]) {
            const formData = new FormData();
            formData.append('file', selectedFile[appointmentId] as File);
            formData.append('appointment_id', String(appointmentId));

            try {
                await uploadFile(formData, token);


                const updatedFiles = await getMyFiles(String(appointmentId), token);
                setRelatedFiles(updatedFiles);


                setSelectedFile(prevState => ({ ...prevState, [appointmentId]: null }));
                setFileName(prevState => ({ ...prevState, [appointmentId]: '' }));


                alert('Dosya başarıyla yüklendi.');
                window.location.reload();
            } catch (error) {

                console.error('Dosya yüklenirken hata oluştu:', error);
                alert('Dosya yüklenemedi! Lütfen gerekli koşulları kontrol edin!');
            }
        } else {
            alert('Dosya seçilmedi veya dosya adı boş.');
        }
    };


    const handleFileDelete = async (fileId: string) => {
        const confirmDelete = window.confirm('Dosyayı silmek istediğine emin misin?');
        if (!confirmDelete) {
            return;
        }
        try {
            const deleted = await deleteFile(fileId, token);

            if (deleted) {
                const files = await getMyFiles(String(appointment.id), token);
                setRelatedFiles(files);
                alert('Dosya başarıyla silindi.');
            } else {
                setError('Dosya silinemedi');
            }

        } catch (error) {
            console.error("Dosya silinirken hata oluştu:", error);
            setError('Dosya silinemedi');
        }
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

    const startMinAsNumber = parseInt(appointment.start_min);

    return (
        <div className="p-4 text-xs font-medium text-gray-800 rounded tracking-wide bg-gray-50 leading-5">
            <div style={{ color: appointment.appointment_type === 'in_person' ? '#7334e0' : '#24aa30' }}>
                {appointmentTypeText}
            </div>
            <div className='font-semibold text-sm'>{appointment.clinic.name}</div>
            <div className='font-medium text-xs'>{appointment.dentist.degree['tr']} {appointment.dentist.name} {appointment.dentist.last_name}</div>
            <span className='text-gray-300 text-xs font-normal text-inherit'>
                {`${appointment.day.split('-')[2]} ${monthNamesArr[parseInt(appointment.day.split('-')[1]) - 1][langName]} ${(() => {
                    const date = new Date(appointment.day);
                    const dayIndex = date.getDay();
                    return daysNamesArr[dayIndex - 1][langName];
                })()
                    } ${timeMinuteConverter(startMinAsNumber)}`}
            </span>
            <div className='flex items-center justify-between'>
                <div className='mt-1'>{langUploadedFiles}</div>
                <div className='w-[30%] mt-1'>
                    <button className="flex float-right bg-[#7334e0] hover:bg-blue-700 text-white font-normal py-1 px-2 rounded" onClick={() => document.getElementById(`fileInput-${appointment.id}`)?.click()}>
                        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5535 2.49392C12.4114 2.33852 12.2106 2.25 12 2.25C11.7894 2.25 11.5886 2.33852 11.4465 2.49392L7.44648 6.86892C7.16698 7.17462 7.18822 7.64902 7.49392 7.92852C7.79963 8.20802 8.27402 8.18678 8.55352 7.88108L11.25 4.9318V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V4.9318L15.4465 7.88108C15.726 8.18678 16.2004 8.20802 16.5061 7.92852C16.8118 7.64902 16.833 7.17462 16.5535 6.86892L12.5535 2.49392Z" fill="#fff" />
                            <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="#fff" />
                        </svg> <span className='ml-2'>{(langFileUpload)}</span>
                    </button>
                    <input id={`fileInput-${appointment.id}`} type="file" className="hidden" onChange={(e) => handleFileChange(e, appointment.id)} />
                </div>
            </div>
            <div className='flex flex-row gap-2'>
                <p className='text-gray-900 font-light text-xs mt-1'>İzin verilen dosya formatları</p>
                <p className='text-gray-900 text-xs font-medium mt-1'>docx, txt, jpgn, png, xls, xlsx, doc, pdf</p>
                <p className='text-gray-900 text-xs font-light mt-1'>Maksimum <b>7 MB</b></p>
            </div>
            {selectedFile[appointment.id] && (
                <div className='mt-2 rounded outline-2 outline-dashed outline-[#21823e] w-full bg-[#f0fcf2] p-4 py-8'>
                    <div className='flex items-center flex-col mb-2'>
                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke="#1C274C" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round" />
                            <path d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749" stroke="#1C274C" strokeWidth="1.5" stroke-linecap="round" />
                        </svg>
                        <div className='text-[#1C274C] font-medium mt-2 text-lg'> Dosyan seçildi </div>
                    </div>
                    {/* <label className='mt-2 mb-2'>Dosya adı (Türkçe karakter kullanmayız!)</label> */}
                    {/* <input
                        type="text"
                        placeholder="Dosya adınızı giriniz..."
                        required
                        value={fileName[appointment.id] || ''}
                        onChange={(e) => setFileName(prevState => ({ ...prevState, [appointment.id]: e.target.value }))}
                        className="border w-full p-3 text-sm font-normal rounded outline-1 outline-[#21823e] mb-2 "
                    /> */}
                    <p className='text-gray-900 font-light text-xs mt-1'>İzin verilen dosya formatları</p>
                    <p className='text-gray-900 text-xs font-medium mt-1'>docx, txt, jpgn, png, xls, xlsx, doc, pdf</p>
                    <p className='text-gray-900 text-xs font-light mt-1'>Maksimum <b>7 MB</b></p>
                    <button onClick={() => handleFileUpload(appointment.id)} className="bg-[#21823e] text-lg tracking-wide mt-3 w-full text-white p-2 rounded">
                        Yükle
                    </button>
                </div>
            )}
            <div className='outline-[#e4e4e4] outline-dashed outline-2 p-4 mt-2'>
                {loading ? (
                    <div>Yükleniyor...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : relatedFiles.rows.length === 0 ? (
                    <div>{(langInfoAppoitment)}</div>
                ) : (
                    <ul>
                        {relatedFiles.rows.map((file, index) => (
                            <li className='mb-2' key={index}>
                                <div className='flex w-full'>
                                    <div className='w-[60%] line-clamp-1 leading-1 flex flex-col'>
                                        <div className="text-xs text-gray-600 font-light">
                                            {file.uploaded_by === 'dentist' ? file.dentist : file.patient}
                                        </div>
                                        <div className='line-clamp-1'>
                                            <a target='_blank' href={`//${file.path.split('|')[0]}`}>{file.file_name}</a>
                                        </div>
                                        <div className='text-gray-600 font-light text-xs'>{formatDate(file.created_at)}</div>
                                    </div>
                                    <div className='w-[30%] flex items-center'>
                                        <div className='w-[48%] mr-[3%]'>
                                            <a className='bg-gray-300 w-full text-center flex justify-center py-1 px-2 rounded' href={file.path}>{file.file_type}</a>
                                        </div>
                                        <div className='w-[45%] mr-[3%]'>
                                            <a target='_blank' className='bg-[#6267ec] text-white w-full flex justify-center text-center py-1 px-2 rounded' href={`//${file.path}`}>İndir</a>
                                        </div>
                                        {file.uploaded_by !== 'dentist' && (
                                            <div className='w-[45%]'>
                                                <button
                                                    onClick={() => handleFileDelete(file.id)}
                                                    className='bg-red-500 text-white w-full flex justify-center text-center py-1 px-3 rounded'
                                                >
                                                    Sil
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
