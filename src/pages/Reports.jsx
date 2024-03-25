import {
    Button,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    Radio,
    RadioGroup
} from "@chakra-ui/react";
import * as PropTypes from "prop-types";

function DrawerContecnt(props) {
    return null;
}

DrawerContecnt.propTypes = {children: PropTypes.node};

function Reports() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = React.useState('right')

    return (
        <>
            <RadioGroup defaultValue={placement} onChange={setPlacement}>

                    <Radio value='left'>Left</Radio>

            </RadioGroup>
            <Button colorScheme='blue' onClick={onOpen}>
                Open
            </Button>
            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContecnt>
                    <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
                    <DrawerBody>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </DrawerBody>
                </DrawerContecnt>
            </Drawer>
        </>
    )
}