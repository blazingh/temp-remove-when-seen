import { Link, Text } from '@radix-ui/themes';

export default function HeaderWithLink({
	headerTitle,
	linkText,
	linkHref,
}: {
	headerTitle: string;
	linkText: string;
	linkHref: string;
}) {
	return (
		<div className="flex items-center justify-between w-full pl-2 pr-2 py-2">
			<div>
				<Text className="text-2xl font-bold pt-4">{headerTitle}</Text>
			</div>
			<div>
				<Link href={linkHref} className="text-sm pt-4 underline">
					{linkText}
				</Link>
			</div>
		</div>
	);
}
