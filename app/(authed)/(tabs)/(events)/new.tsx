import Button from "@/components/Button";
import DateTimePicker from "@/components/DateTimePicker";
import Input from "@/components/Input";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { eventService } from "@/services/event";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function NewEvent() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());

  function onChangeDate(date?: Date) {
    setDate(date || new Date());
  }

  async function onSubmit() {
    try {
      setLoading(true);

      await eventService.createOne(name, location, date.toISOString());
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to create event");
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "New Event",
    });
  }, []);


  return (
    <VStack m={20} flex={1} gap={30}>

      <VStack gap={5}>
        <Text ml={10} fontSize={18} color="gray">Name</Text>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={18} color="gray">Location</Text>
        <Input
          value={location}
          onChangeText={setLocation}
          placeholder="Location"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={18} color="gray">Date</Text>
        <DateTimePicker
          currentDate={date}
          onChange={onChangeDate}
        // minimumDate={new Date()}
        // value={new Date(eventData?.date ?? new Date())}
        // mode={"datetime"}
        />
      </VStack>
      <Button
        mt={"auto"}
        isLoading={loading}
        disabled={loading}
        onPress={onSubmit}
      >
        Save
      </Button>

    </VStack>
  );
}
