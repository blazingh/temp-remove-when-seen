import { Link, Text } from '@radix-ui/themes';

export default function HeaderWithButton({
	headerTitle,
	linkText,
}: {
	headerTitle: string;
	linkText: string;
}) {
	return (
		<div className="flex items-center justify-between w-full pl-2 pr-2 py-2">
			<div>
				<Text className="text-2xl font-bold pt-4">{headerTitle}</Text>
			</div>
			<div>
				<span className="text-sm pt-4 underline">
					{linkText}
				</span>
			</div>
		</div>
	);
}
