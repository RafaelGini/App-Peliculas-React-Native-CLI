import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../../styles/theme';

interface Props {
    t: (key: string) => string;
    image: string;
    nickname: string;
    name: string;
    surname: string;
    email: string;
    handleChangePic: () => void;
    handleSaveChanges: () => void;
    handleActiveSave: (currentNick: string, initialNick: string) => boolean;
    createAlertLogout: () => void;
    createAlertDelete: () => void;
    setNickname: (nickname: string) => void;
}

const UI_ProfileScreen: React.FC<Props> = ({
    t,
    image,
    nickname,
    name,
    surname,
    email,
    handleChangePic,
    handleSaveChanges,
    handleActiveSave,
    createAlertLogout,
    createAlertDelete,
    setNickname,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={{ uri: image }}
                />
                <TouchableOpacity style={styles.changeAvatarButton} onPress={handleChangePic}>
                    <Text style={styles.changeAvatarButtonText}>{t('BUTTON_CHANGE_PIC')}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>{t('LABEL_NICKNAME')}</Text>
                <TextInput
                    style={[styles.input, styles.inputEdit]}
                    placeholder={t('PLACEHOLDER_NICKNAME')}
                    placeholderTextColor={theme.colors.red}
                    value={nickname}
                    onChangeText={setNickname}
                />
                <Text style={styles.label}>{t('LABEL_NAME')}</Text>
                <TextInput
                    style={styles.input}
                    value={`${name} ${surname}`}
                    editable={false}
                />
                <Text style={styles.label}>{t('LABEL_EMAIL')}</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    editable={false}
                />
                <TouchableOpacity
                    style={[styles.buttonContainerDefault, styles.buttonContainerChanges]} // Siempre usa el estilo de cambios
                    onPress={handleSaveChanges} // Mantiene el handler para guardar cambios
                >
                    <Text style={styles.buttonText}>{t('BUTTON_SAVE_CHANGES')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonContainerDefault, styles.buttonContainerLogout]} onPress={createAlertLogout}>
                    <Text style={styles.buttonText}>{t('BUTTON_LOGOUT')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonContainerDefault, styles.buttonContainerDelete]} onPress={createAlertDelete}>
                    <Text style={styles.buttonText}>{t('BUTTON_DELETE_ACCOUNT')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
    },
    form: {
        justifyContent: 'center',
        width: '80%',
    },
    label: {
        marginTop: 14,
        color: theme.colors.text,
    },
    input: {
        borderColor: theme.colors.grey,
        borderWidth: 1,
        borderRadius: 25,
        marginTop: 3,
        height: 40,
        padding: 10,
        fontSize: 16,
        color: theme.colors.text_light,
    },
    inputEdit: {
        color: theme.colors.text,
    },
    buttonContainerDefault: {
        marginTop: 10,
        alignSelf: 'center',
        alignItems: 'center',
        width: 170,
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    buttonContainerChanges: {
        backgroundColor: theme.colors.primary,
        marginTop: 20,
    },
    buttonContainerInactive: {
        backgroundColor: theme.colors.primary_inactive,
        marginTop: 20,
    },
    buttonContainerLogout: {
        backgroundColor: theme.colors.grey,
    },
    buttonContainerDelete: {
        backgroundColor: theme.colors.red,
    },
    buttonText: {
        color: theme.colors.background,
        fontSize: 12,
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    changeAvatarButton: {
        marginTop: 5,
    },
    changeAvatarButtonText: {
        color: theme.colors.primary,
        fontSize: 14,
    },
});

export default UI_ProfileScreen;
