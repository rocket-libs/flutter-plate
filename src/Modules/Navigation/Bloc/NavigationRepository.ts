import NavigationStrings from "../Data/NavigationStrings";

export default class NavigationRepository{
    routes: string[] = [
        NavigationStrings.blocContext,
        NavigationStrings.model
    ];

    activeRoute: string = "";
}