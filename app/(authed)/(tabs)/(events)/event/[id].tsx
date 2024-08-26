import { Text } from "@/components/Text";
import { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { eventService } from "@/services/event";
import { Alert } from "react-native";
import { Event } from "@/types/event";
import { useOnScreenFocusCallback } from "@/hooks/useOnScreenFocusCallback";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { VStack } from "@/components/VStack";
import Input from "@/components/Input";
import Button from "@/components/Button";
import DateTimePicker from "@/components/DateTimePicker";
export default function EventDetailScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState<Event | null>(null);

  function updateField(field: keyof Event, value: string | Date) {
    setEventData((prev) => ({
      ...prev!,
      [field]: value,
    }));
  }
  const onDelete = useCallback(async () => {
    if (!eventData) return;
    try {

      Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
        {
          text: "Cancel"
        },
        {
          text: "Delete", onPress: async () => {
            await eventService.deleteOne(Number(id));
            router.back();
          }
        }
      ])

    } catch (error) {
      Alert.alert("Error", "Failed to delete event");
    }
  }, [eventData, id]);

  async function onSubmitChanges() {
    if (!eventData) return;
    try {
      setLoading(true);
      await eventService.updateOne(Number(id),
        eventData.name,
        eventData.location,
        eventData.date
      );
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update event");
    } finally {
      setLoading(false);
    }
  }

  const fetchEvent = async () => {
    try {
      const response = await eventService.getOne(Number(id));
      setEventData(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch event");
      return;
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(useCallback(() => { fetchEvent(); }, []));

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerRight: () => headerRight(onDelete),
    });
  }, [navigation, onDelete]);
  const headerRight = (onPress: VoidFunction) => {
    return <TabBarIcon size={24} name="trash" onPress={onPress} />;
  }

  return (
    <VStack m={20} flex={1} gap={30}>

      <VStack gap={5}>
        <Text ml={10} fontSize={18} color="gray">Name</Text>
        <Input
          value={eventData?.name}
          onChangeText={(value) => updateField("name", value)}
          placeholder="Name"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={18} color="gray">Location</Text>
        <Input
          value={eventData?.location}
          onChangeText={(value) => updateField("location", value)}
          placeholder="Location"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={18} color="gray">Date</Text>
        <DateTimePicker
          currentDate={new Date(eventData?.date ?? new Date())}
          onChange={(date) => updateField("date", date || new Date())}
        // minimumDate={new Date()}
        // value={new Date(eventData?.date ?? new Date())}
        // mode={"datetime"}
        />
      </VStack>

      <Button
        mt={"auto"}
        isLoading={loading}
        disabled={loading}
        onPress={onSubmitChanges}
      >
        Save
      </Button>

    </VStack>
  );
}