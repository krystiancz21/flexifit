package com.flexifit.seeder;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.flexifit.groupclass.GroupClass;
import com.flexifit.groupclass.GroupClassRepository;
import com.flexifit.ticket.Ticket;
import com.flexifit.ticket.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements ApplicationRunner {
    
    private static final Logger logger = LoggerFactory.getLogger(DatabaseSeeder.class);
    
    private final TicketRepository ticketRepository;
    private final GroupClassRepository groupClassRepository;
    private final ObjectMapper objectMapper;
    private final ResourceLoader resourceLoader;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        try {
            if (ticketRepository.count() == 0) {
                seedTickets();
                logger.info("Tickets seeded successfully");
            }
            
            if (groupClassRepository.count() == 0) {
                seedGroupClasses();
                logger.info("Group classes seeded successfully");
            }
        } catch (IOException e) {
            logger.error("Error seeding database: {}", e.getMessage());
        }
    }

    private void seedTickets() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:seeds/ticketSeed.json");
        if (!resource.exists()) {
            logger.error("ticketSeed.json not found");
            return;
        }

        List<Ticket> tickets = objectMapper.readValue(
            resource.getInputStream(),
            new TypeReference<List<Ticket>>() {}
        );
        
        ticketRepository.saveAll(tickets);
        logger.info("Saved {} tickets", tickets.size());
    }

    private void seedGroupClasses() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:seeds/groupClassSeed.json");
        if (!resource.exists()) {
            logger.error("groupClassSeed.json not found");
            return;
        }

        List<GroupClass> classes = objectMapper.readValue(
            resource.getInputStream(),
            new TypeReference<List<GroupClass>>() {}
        );
        
        groupClassRepository.saveAll(classes);
        logger.info("Saved {} group classes", classes.size());
    }
} 