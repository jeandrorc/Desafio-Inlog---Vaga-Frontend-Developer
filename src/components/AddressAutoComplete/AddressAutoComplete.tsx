import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import { TextField, Paper, List, ListItem } from "@mui/material";
import useGoogleMapsScript from "utils/hooks/useGoogleMpasScriptOptions";

type Props = {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
};

const AddressAutocomplete: React.FC<Props> = ({ onPlaceSelected }) => {
  const [address, setAddress] = React.useState<string>("");
  const { isScriptLoaded } = useGoogleMapsScript();


  const handleChange = (address: string): void => {
    setAddress(address);
  };

  const handleSelect = async (address: string): Promise<void> => {
    try {
      const results = await geocodeByAddress(address);
      onPlaceSelected(results[0]);
      setAddress(address);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return isScriptLoaded ? (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div style={{ position: "relative" }}>
          <TextField
            {...getInputProps({
              label: "Procurar endereço",
              variant: "outlined",
            })}
            fullWidth
          />
          {(suggestions.length || loading) && (
            <Paper
              style={{
                position: "absolute",
                width: "100%",
                zIndex: 10,
              }}
            >
              <List>
                {loading && (
                  <ListItem>
                    <div>Carregando...</div>
                  </ListItem>
                )}
                {suggestions.map((suggestion) => (
                  <ListItem {...getSuggestionItemProps(suggestion)}>
                    {suggestion.description}
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </div>
      )}
    </PlacesAutocomplete>
  ) : null;
};

export default AddressAutocomplete;
