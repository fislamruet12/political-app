import { Box, Text } from "native-base"

const EditComMem = (props: any) => {
    const singleMem = props.route.params
    console.log(singleMem)
    return (
        <Box>
            <Text>edit com</Text>
        </Box>
    )
}
export default EditComMem