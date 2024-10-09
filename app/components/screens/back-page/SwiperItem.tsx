import React, { FC, memo } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { useGetContextData } from '@/components/hooks/useGetContextData';
import HTMLView from 'react-native-htmlview';
import { Data } from '@/types/fbdata.interface';

const SwiperItem: FC<{ item: Data }> = memo(({ item }) => {
	const { width } = Dimensions.get('window');

	const month = item.front.year_month.split(' / ')[0]
	const year = item.front.year_month.split(' / ')[1]

	return (
		<View
			key={item.front.id}
			className={`items-center pt-4 px-5`}
			style={[{ width }]}
		>
			<View className='border-b border-gray-400 mb-2'>
				<Text className='uppercase font-bold text-gray-500 text-xs'>
					<Text>{`${item.front.day}-${month} ${year}`}</Text>
					<Text> | </Text>
					<Text>{`${item.front.hijri_date}`}</Text>
				</Text>
			</View>
			{item.back.map((backItem: any) => {
				return (
					<View key={backItem.id} className='mb-5'>
						<Text className='font-bold uppercase text-center mb-1'>
							{backItem.category}
						</Text>
						<Text className='font-bold mb-3 uppercase text-primary text-center text-lg'>
							{backItem?.title}
						</Text>
						<View className='text-justify'>
							<HTMLView
								value={backItem?.content?.replace(/\n/g, '')}
								stylesheet={{
									p: {
										textAlign: 'justify',
										marginBottom: -15,
										lineHeight: 18
									},
								}}
							/>
						</View>
					</View>
				)
			})}
		</View>
	)
});

export default SwiperItem;