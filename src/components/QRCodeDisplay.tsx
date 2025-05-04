import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type QRCodeDisplayProps = {
    eventId: number;
    eventName: string;
    size?: number;
};

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ 
    eventId,
    eventName,
    size = 200
}) => {

    {/* for debuggin' */}
    // console.log('Received props:', { eventId, eventName });

    const qrData = eventId.toString();

    return (
        <View style={styles.container}>
            {/* Show QR Code */}
            <QRCode
                value={qrData}
                size={size}
                color="black"
                backgroundColor="white"
            />

            {/* Display event ID for accessibility. Might delete if we don't get to manual check-in through ID */}
            <View style={styles.idContainer}>
                <Text style={styles.idLabel}>Event ID:</Text>
                <Text style={styles.idValue} selectable={true}>{eventId}</Text>
            </View>

            {/* Render event name */}
            <Text style={styles.eventName}>{eventName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 12,
      margin: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    idContainer: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
    },
    idLabel: {
        fontWeight: 'bold',
        marginRight: 8,
        color: '#333',
    },
    idValue: {
        fontSize: 18,
        fontFamily: 'monospace',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    eventName: {
        marginTop: 8,
        color: '#60269e',
        textAlign: 'center',
    },
});
  
export default QRCodeDisplay;