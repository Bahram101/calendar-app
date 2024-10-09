import React, { FC, memo } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { useGetContextData } from '@/components/hooks/useGetContextData';
import HTMLView from 'react-native-htmlview';
import { Data } from '@/types/fbdata.interface';

const SwiperItem: FC<{ item: Data }> = memo(({ item }) => {
	const { dateToday } = useGetContextData();
	const { width } = Dimensions.get('window');

	const getColorForDate = (itemDate: string) => {
		return itemDate === dateToday ? 'text-primary' : 'text-gray-400';
	};

	const textColor = getColorForDate(item?.front.date);

	return (
		<View key={item.front.id} className={`items-center pt-8 px-5`} style={[{ width }]}>
			<Text className='text-xl font-bold uppercase selft-start'>
				{item?.front.hijri_date}
			</Text>
			<Text className={`font-bold mb-3 text-[180px] ${textColor}`}>
				{item?.front.day}
			</Text>
			<Text className='text-2xl font-bold uppercase'>
				{item?.front.year_month}
			</Text>
			<Text className={`uppercase text-2xl font-bold mb-[40px] ${textColor}`}>
				{item.front.dayofweek}
			</Text>
			<View className='mb-[20px] w-full border-b border-gray-300 pb-4'>
				<HTMLView
					value={item?.front.history.replace(/\n/g, '')}
					stylesheet={{
						p: {
							textAlign: 'center',
						},
					}}
				/>
			</View>
			<View className='w-full text-center'>
				<HTMLView
					value={item?.front.quote.replace(/\n/g, '')}
					stylesheet={{
						p: {
							textAlign: 'center',
							marginBottom: -17,
						},
					}}
				/>
			</View>
		</View>
	);
});

export default SwiperItem;