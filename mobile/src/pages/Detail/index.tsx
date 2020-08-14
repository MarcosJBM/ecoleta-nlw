import React, { useEffect, useState } from 'react';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, SafeAreaView, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';

interface Params {
    point_id: number;
};

interface Data {
    point: {
        image: string,
        name: string,
        email: string,
        whatsapp: string,
        city: string,
        uf: string
    };
    items: {
        title: string;
    }[];
};

const Detail = () => {
    const [data, setData] = useState<Data>({} as Data);

    const navigation = useNavigation();
    const route = useRoute();

    const routeParams = route.params as Params;

    //Pega os dados de um Ponto.
    useEffect(() => {
        api.get(`points/${routeParams.point_id}`).then(response => {
            setData(response.data);
        });
    }, []);

    function handleNavigateBack() {
        navigation.goBack();
    };

    //Abre o Whatsapp.
    function handleWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse na coleta de reíduos`);
    };

    //Abre o aplicativo de Email.
    function handleComposeMail() {
        MailComposer.composeAsync({
            subject: 'Interesse em coleta de resíduos',
            recipients: [data.point.email]
        });
    };

    //Caso os dados do ponto não sejam retornados, ele não retorna nada na tela.
    if (!data.point) {
        return null;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79" style={{ paddingTop: 30 }} />
                </TouchableOpacity>

                <Image style={styles.pointImage} source={{ uri: data.point.image }} />
                <Text style={styles.pointName}>{data.point.name}</Text>
                <Text style={styles.pointItems}>{data.items.map(item => item.title).join(', ')}</Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>{data.point.city} , {data.point.uf}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatsapp}>
                    <FontAwesome name="whatsapp" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Whatsapp</Text>
                </RectButton>

                <RectButton style={styles.button} onPress={handleComposeMail}>
                    <Icon name="mail" size={20} color="#fff" />
                    <Text style={styles.buttonText}>E-mail</Text>
                </RectButton>
            </View>
        </SafeAreaView>
    );
};

export default Detail;