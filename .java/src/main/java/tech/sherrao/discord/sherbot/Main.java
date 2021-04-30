package tech.sherrao.discord.sherbot;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import javax.security.auth.login.LoginException;

import org.apache.commons.lang.math.RandomUtils;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.entities.Member;
import net.dv8tion.jda.api.entities.TextChannel;
import net.dv8tion.jda.api.entities.User;
import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent;
import net.dv8tion.jda.api.hooks.AnnotatedEventManager;
import net.dv8tion.jda.api.hooks.SubscribeEvent;

public class Main extends AnnotatedEventManager {
	
	public static final String TOKEN = null;
	private User member;
	private TextChannel channel;
	
	public Main() {
		try {
			JDA jda = JDABuilder.createDefault(TOKEN).build();
			jda.awaitReady();
			jda.setEventManager(this);
			jda.addEventListener(this);
			member = jda.getUserById(147187131838758913L);
			channel = jda.getTextChannelById(564628634673872939L);
			
			List<Member> m = jda.getGuildById(564628634673872936L).getMembers();
			Executors.newScheduledThreadPool(1).scheduleWithFixedDelay(() -> {
				if (RandomUtils.nextFloat() > 0f && member != null)
					channel.sendMessage(member.getAsMention() + " fuck you").complete();

				else
					channel.sendMessage(m.get(RandomUtils.nextInt(m.size())).getAsMention() + " fuck you").complete();

			}, 0, 5, TimeUnit.SECONDS);

		} catch (LoginException | InterruptedException e) {
			e.printStackTrace();

		}

	}
	
	@SubscribeEvent
	public void onCommand(GuildMessageReceivedEvent event) {
		User user = event.getAuthor();
		String msg = event.getMessage().getContentRaw();
		if(user.getIdLong() == 190984801929396224L) {
			if(msg.startsWith("spamuser") )
				if(event.getMessage().getMentionedUsers().size() > 0)
					this.member = event.getMessage().getMentionedUsers().get(0);
				
				else 
					this.member = null;
			
			else if(msg.startsWith("spamchannel"))
				if(event.getMessage().getMentionedChannels().size() > 0)
					this.channel = event.getMessage().getMentionedChannels().get(0);
				else 
					this.member = null;
		}
		
	}
	
	public static void main(String[] args) throws Exception {
		new Main();

	}

}
