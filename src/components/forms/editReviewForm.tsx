'use client'

import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useLocale } from 'next-intl'
import { EditReviewUpdateForm } from '../../actions/form-regular-data'

import { Locale } from '@/i18n'
import { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { Textarea } from '../ui/text-area'
import ReviewFormSuccess from '../pages/account/reviewUpdateSucces'



function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus()




    return (
        <Button type="submit" aria-disabled={pending} className={cn(pending && 'opacity-50', 'w-full')}>
            {pending
                ? <Loader2 className="h-6 w-6 animate-spin" />
                : label
                // todo
            }
        </Button>
    )
}

export function EditReviewForm({ id, subjectType, subjectBody, subjectRate }: { id: number, subjectType: string, subjectBody: string, subjectRate: number }) {





    const initialState = {
        subject_type: subjectType,
        body: subjectBody,
        subject_id: id,
        rate: subjectRate,
    }

    const lang = useLocale() as Locale



    const fillColorArray = [
        "#f17a45",
        "#f17a45",
        "#f19745",
        "#f19745",
        "#f1a545",
        "#f1a545",
        "#f1b345",
        "#f1b345",
        "#f1d045",
        "#f1d045"
    ];

    const [state, formAction1] = useFormState(EditReviewUpdateForm, initialState)
    const [rate, setRate] = useState(subjectRate)
    const [body, setBody] = useState(subjectBody)


    const handleServiceProviderRating = (rate: number) => {
        setRate(rate)
    }

    return (
        <div className='w-full'>
            {!state?.success && (
                <form action={formAction1} className='flex flex-col gap-4 w-full'>
                    <input type="hidden" name="subject_type" value={subjectType} />
                    <input type="hidden" name="subject_id" value={id} />
                    <input type="hidden" name="rate" value={rate} />
                    <input type="hidden" name="body" value={body} />
                    <div className='w-full'>
                        <h1 className="text-2xl font-semibold text-gray-900 text-left mb-1">{'Yorumunu Duzenle'}</h1>
                    </div>
                    <div>
                        <Textarea
                            id="body"
                            className='w-full'
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder={'Yorum'}
                            required
                        />
                    </div>
                    <div className='flex w-full justify-between'>
                        <div className='items-center justify-center flex'>
                            <span >Değerlendirme Puanın:</span>

                        </div>
                        <Rating
                            initialValue={rate}
                            SVGclassName="inline"
                            size={40}
                            onClick={handleServiceProviderRating}
                            transition
                            allowFraction
                            fillColorArray={fillColorArray}
                        />
                    </div>

                    <SubmitButton label={lang === 'en' ? 'Save' : 'Kaydet'} />


                </form>
            )}

            {state?.success && (
                <ReviewFormSuccess />
            )}

        </div>
    )
}
