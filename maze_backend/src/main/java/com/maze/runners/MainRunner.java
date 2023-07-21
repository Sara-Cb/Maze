package com.maze.runners;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.maze.enumerations.Category;
import com.maze.enumerations.FeedItemType;
import com.maze.models.Collection;
import com.maze.models.Creative;
import com.maze.models.Elaborate;
import com.maze.models.FeedItem;
import com.maze.models.Follow;
import com.maze.services.CollectionService;
import com.maze.services.CreativeService;
import com.maze.services.ElaborateService;
import com.maze.services.FeedItemService;
import com.maze.services.FollowService;

@Component
public class MainRunner implements ApplicationRunner {

    @Autowired
    CreativeService creativeService;

    @Autowired
    CollectionService collectionService;

    @Autowired
    ElaborateService elaborateService;

    @Autowired
    FeedItemService feedItemService;

    @Autowired
    FollowService followService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("Run...");
        saveElaboratesAndCollections();
        saveFeedItem();
        saveFollows();
    }

    private void saveElaboratesAndCollections() {
        if (collectionService.getAllCollections().isEmpty() || elaborateService.getAllElaborates().isEmpty()) {
            List<Creative> users = creativeService.getAllCreatives();
            String[] titles = { "Amazing Art", "Beautiful Designs", "Creative Creations" };
            String[] descriptions = { "A collection of amazing art pieces", "A showcase of beautiful designs",
                    "A compilation of creative creations" };
            Category[] categories = { Category.ART, Category.DESIGN, Category.PHOTOGRAPHY };
            String[] keywords = { "art", "design", "photography" };
            String[] elaborateTitles = { "Art Piece 1", "Design 1", "Photo 1" };
            String[] elaborateDescriptions = { "A beautiful art piece", "An amazing design", "A stunning photograph" };

            for (Creative user : users) {
                for (int i = 0; i < 3; i++) {
                    Collection collection = new Collection();
                    collection.setAuthor(user);
                    collection.setPortfolio(user.getPortfolio());
                    collection.setTitle(titles[i]);
                    collection.setDescription(descriptions[i]);
                    collection.setCategory(categories[i]);
                    collection.setCoverImage("https://picsum.photos/200");
                    Set<String> keywordSet = new HashSet<>(Arrays.asList(keywords));
                    collection.setKeywords(keywordSet);
                    collectionService.saveCollection(collection);

                    int numElaborates = i == 0 ? 1 : 3;
                    for (int j = 0; j < numElaborates; j++) {
                        Elaborate elaborate = new Elaborate();
                        elaborate.setAuthor(user);
                        elaborate.setFile("https://picsum.photos/200");
                        elaborate.setTitle(elaborateTitles[i]);
                        elaborate.setDescription(elaborateDescriptions[i]);
                        elaborate.setCollection(collection);

                        elaborateService.saveElaborate(elaborate);
                    }
                }
            }
        }
    }

    private void saveFeedItem() {
        if (feedItemService.getAllFeedItems().isEmpty()) {
            List<Collection> collections = collectionService.getAllCollections();
            for (Collection collection : collections) {
                FeedItem feedItem = new FeedItem();
                feedItem.setAuthor(collection.getAuthor());
                feedItem.setCollection(collection);
                feedItem.setType(FeedItemType.NEW);
                feedItem.setCaption("Check out my new collection: " + collection.getTitle());

                // Salva il FeedItem
                feedItemService.saveFeedItem(feedItem);
            }
        }
    }

    private void saveFollows() {
        if (followService.getAllFollows().isEmpty()) {
            List<Creative> users = creativeService.getAllCreatives();
            for (int i = 0; i < users.size(); i++) {
                for (int j = i + 1; j < users.size(); j++) {
                    Creative follower = users.get(i);
                    Creative followed = users.get(j);

                    // Crea un oggetto Follow
                    Follow follow1 = new Follow();
                    follow1.setFollower(follower);
                    follow1.setFollowed(followed);

                    // Salva l'oggetto Follow
                    followService.saveFollow(follow1);

                    // Crea un altro oggetto Follow per fare in modo che anche l'altro utente segua
                    // il primo
                    Follow follow2 = new Follow();
                    follow2.setFollower(followed);
                    follow2.setFollowed(follower);

                    // Salva l'altro oggetto Follow
                    followService.saveFollow(follow2);
                }
            }

        }
    }
}
