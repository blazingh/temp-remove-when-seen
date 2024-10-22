'use client';
import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
} from '../../ui/form';
import {
	Select,
	SelectValue,
	SelectTrigger,
	SelectItem,
	SelectContent,
} from '../../ui/select';
import { Button } from '../../ui/button';
import IconTreatments from "@/icons/treatments"
import IconLocation from "@/icons/location"
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const countries = ['İstanbul', 'Ankara', 'Bursa', 'İzmir'];
const treatments = ['Kanal', 'Çekim', 'Taş Temizliği'];

export default function HomeMainForm() {
	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const response = await fetch('/api/submit', {
			method: 'POST',
			body: formData,
		});

		// Handle response if necessary
		const data = await response.json();
		// ...
	}

	const formSchema = z.object({
		city: z.string().nonempty(),
		treatment: z.string().nonempty(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			city: 'Istabul',
			treatment: 'Dis Beyazlatma',
		},
	});

	return (
		<Form {...form}>
			<form className="w-full px-4 w-full grid grid-cols-2 gap-2">
				<FormField
					control={form.control}
					name="city"
					render={({ field }) => (
						<FormItem className="col-span-1">
							<IconLocation className="absolute mt-7 ml-2"/>
							<Select >
								<SelectTrigger className='pl-8' placeholder={'Şehir Seçin'}>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
								<SelectItem value="null" disabled>
									Select a country
								</SelectItem>
									{countries.map((item: any) => (
										<div key={item.id}>
											<SelectItem value={String(item)}>
												{item}
											</SelectItem>
										</div>
									))}
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="city"
					render={({ field }) => (
						<FormItem className="col-span-1">
							<IconTreatments className="absolute mt-7 ml-2"/>
							<Select >
								<SelectTrigger className='pl-8' placeholder={'Tedavi Seçin'}>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
								<SelectItem value="null" disabled>
									Select a country
								</SelectItem>
									{treatments.map((item: any) => (
										<div key={item.id}>
											<SelectItem value={String(item)}>
												{item}
											</SelectItem>
										</div>
									))}
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
